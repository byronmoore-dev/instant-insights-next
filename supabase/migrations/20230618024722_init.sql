CREATE TABLE IF NOT EXISTS user_conversation (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  input_data_id uuid REFERENCES user_to_ai_input_data(input_data_id),
  user_id uuid references auth.users default auth.uid()
);

CREATE TABLE IF NOT EXISTS user_to_ai_input_data (
  user_uid uuid REFERENCES user_info(user_uid),
  input_data_id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  input_data_type VARCHAR(50),
  input_data TEXT,cr
  input_data_summary TEXT
);

CREATE TABLE IF NOT EXISTS ai_to_user_output_data (
  input_data_id uuid PRIMARY KEY REFERENCES user_to_ai_input_data(input_data_id),
  insights TEXT,
  visualization_data_1 JSON,
  visualization_data_2 JSON
);

CREATE TABLE IF NOT EXISTS conversation_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_conversation_table_id uuid REFERENCES user_conversation(id),
  message TEXT,
  sender VARCHAR(50),
  sent_time timestamp with time zone DEFAULT timezone('utc'::text, now()) not null
);

create table if not exists todos (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text,
  is_complete boolean default false,
  user_id uuid references auth.users default auth.uid()
);


-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
ALTER TABLE user_conversation ENABLE row level security;
ALTER TABLE user_to_ai_input_data ENABLE row level security;
ALTER TABLE ai_to_user_output_data ENABLE row level security;
ALTER TABLE conversation_messages ENABLE row level security;


alter table todos
  enable row level security;

create policy "Authenticated users can select todos" on todos
  for select to authenticated using (true);

create policy "Authenticated users can insert their own todos" on todos
  for insert to authenticated with check (auth.uid() = user_id);


CREATE POLICY "Authenticated users can select their own output data" ON ai_to_user_output_data
  FOR SELECT TO authenticated USING (auth.uid() = user_uid);

CREATE POLICY "Authenticated users can select their own messages" ON conversation_messages
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert their own messages" ON conversation_messages
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);


-- Set up Row Level Security (RLS)
alter table ai_viz_data enable row level security;

create policy "Authenticated users can select their own viz data" on ai_viz_data for
select
  to authenticated using (auth.uid () = user_id);

create policy "Authenticated users can insert their own conversations" on ai_viz_data for insert to authenticated
with
  check (auth.uid () = user_id);

-- Set up Row Level Security (RLS)
alter table user_conversation enable row level security;

create policy "Authenticated users can select their own conversations" on user_conversation for
select
  to authenticated using (auth.uid () = user_id);

create policy "Authenticated users can insert their own conversations" on user_conversation for insert to authenticated
with
  check (auth.uid () = user_id);


-- Set up Row Level Security (RLS)
alter table conversation_messages enable row level security;

create policy "Authenticated users can select their own messages" on conversation_messages for
select
  to authenticated using (auth.uid () = user_conversation.user_id) using (
    conversation_messages.user_conversation_id = user_conversation.id
  );

create policy "Authenticated users can insert their own messages" on conversation_messages for insert to authenticated
with
  check (auth.uid () = user_conversation.user_id);