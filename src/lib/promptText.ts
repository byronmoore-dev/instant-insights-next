export const systemPrompt = `You are an expert in digital analytics. You will be sent data in table format. Additonally attached 
  will be a summary of said content. You will respond with no words, only JSON. The JSON will have 4 
  attributes. title: describing the data, insights: some text indicating three ideas from the data, 
  and 2 visualizations: an array formatted for a pie chart of the data from one of your insights and another piechart. Always respond with the proper function. ALWAYS.`;

export const summarySample =
  "The submitted data is a table describing every video game i have ever played, starting as a kid until now. it has the name, the platform, and the release date of the game. additionally, there is a rating i gave them game, 1 to 5 means it is good, 6 to 8 means it is great, and 9 to 10 mean it's increidible.";

export const dataSample = `Super Mario Bros	7	Gameboy Advance	1999
Mario Kart: Super Circuit 	7	Gameboy Advance	2001
Star Wars: Flight of the Falcon	5	Gameboy Advance	2003
Spongebob Squarepants: Supersponge + Revenge of the Flying Dutchman	4	Gameboy Advance	2002
Scooby Doo: Mystery Mayhem	4	Gameboy Advance	2003
Nicktoons Racing	6	Gameboy Advance	2002
Castlevania: Circle of the Moon	5	Gameboy Advance	2001
Star Wars: Battlefront 1	7	PS2	2004
Star Wars: Battlefront 2	8	PS2	2005
Spngebob Squarepants: The Movie	3	PS2	2004
Scooby Doo: Night of 100 Frights	2	PS2	2002
Spongebob Squarepants: Lights, Camera, Pants!	6	PS2	2005
Scooby Doo: Mystery Mayhem	3	PS2	2004
Star Wars Episode III: Revenge of the Sith	6	PS2	2005
Lego Star Wars: The Video Game	7	PS2	2005
Lego Star Wars II: The Original Trilogy	7	PS2	2006
Guitar Hero	7	PS2	2007
Mario and Sonic at the Olympic Games	4	DS	2007
Fossil Fighters	8	DS	2008
The Legend of Zelda: Phantom Hourglass	7	DS	2007
Fire Emblem: Shadow Dragon	8	DS	2008
Fossil Fighters Champions	8	DS	2011
Age of Empires Mythology	9	DS	2008
Percy Jackson and the Olympians	4	DS	2010
Mario Kart DS	7	DS	2005
Lego Battles	5	DS	2009
Fossil Fighters Frontier	6	3DS	2014
Fire Emblem: Awakening	8	3DS	2013
Mario Kart 7	7	3DS	2011
Minecraft	7	Xbox 360	2012
Lego Star Wars III: The Clone Wars	8	Xbox 360	2011
Halo Reach	5	Xbox 360	2010
Halo 4	7	Xbox 360	2012
Destiny	9	Xbox 360	2014
Terraria	6	Xbox 360	2011
COD: MW3	7	Xbox 360	2011
COD: Black Ops 1	3	Xbox 360	2010
COD Black Ops 2	7	Xbox 360	2012
Skylanders: Spyros Adventure	6	Xbox 360	2011
Skyrim	7	Xbox 360	2011
Skylanders Giants	4	Xbox 360	2012
COD: Ghosts	5	Xbox 360	2013
Super Mario Bros	8	Wii	2009
Mario Kart Wii	9	Wii	2008
Mario Party 8	6	Wii	2007
Wii Sports	7	Wii	2006
Wii Play	6	Wii	2007
Donkey Kong Country Returns	4	Wii	2010
Super Paper Mario	3	Wii	2007
Mario Party 9	2	Wii	2012`;

export const thuroughPrompt = `The provided data represents a collection of video games across various platforms including Gameboy Advance, PS2, DS, 3DS, Xbox 360, and Wii. The games encompass different genres such as Platformer, Racing, Shooter, Action/Adventure, Role-Playing, and Party. Each entry in the data set includes information about the game's title, rating (presumably on a scale of 1 to 9), platform, release year, and genre. The data spans a range of release years and features popular franchises like "Super Mario Bros," "Star Wars," "Halo," and "Call of Duty.`;

export const dataPrompt = `[
  {"title": "Super Mario Bros", "rating": 7, "platform": "Gameboy Advance", "year": 1999, "genre": "Platformer"},
  {"title": "Mario Kart: Super Circuit", "rating": 7, "platform": "Gameboy Advance", "year": 2001, "genre": "Racing"},
  {"title": "Star Wars: Flight of the Falcon", "rating": 5, "platform": "Gameboy Advance", "year": 2003, "genre": "Action"},
  {"title": "Spongebob Squarepants: Supersponge + Revenge of the Flying Dutchman", "rating": 4, "platform": "Gameboy Advance", "year": 2002, "genre": "Platformer"},
  {"title": "Scooby Doo: Mystery Mayhem", "rating": 4, "platform": "Gameboy Advance", "year": 2003, "genre": "Adventure"},
  {"title": "Nicktoons Racing", "rating": 6, "platform": "Gameboy Advance", "year": 2002, "genre": "Racing"},
  {"title": "Castlevania: Circle of the Moon", "rating": 5, "platform": "Gameboy Advance", "year": 2001, "genre": "Action/Adventure"},
  {"title": "Star Wars: Battlefront 1", "rating": 7, "platform": "PS2", "year": 2004, "genre": "Shooter"},
  {"title": "Star Wars: Battlefront 2", "rating": 8, "platform": "PS2", "year": 2005, "genre": "Shooter"},
  {"title": "Spongebob Squarepants: The Movie", "rating": 3, "platform": "PS2", "year": 2004, "genre": "Platformer"},
  {"title": "Scooby Doo: Night of 100 Frights", "rating": 2, "platform": "PS2", "year": 2002, "genre": "Adventure"},
  {"title": "Spongebob Squarepants: Lights, Camera, Pants!", "rating": 6, "platform": "PS2", "year": 2005, "genre": "Party"},
  {"title": "Scooby Doo: Mystery Mayhem", "rating": 3, "platform": "PS2", "year": 2004, "genre": "Adventure"},
  {"title": "Star Wars Episode III: Revenge of the Sith", "rating": 6, "platform": "PS2", "year": 2005, "genre": "Action"},
  {"title": "Lego Star Wars: The Video Game", "rating": 7, "platform": "PS2", "year": 2005, "genre": "Action/Adventure"},
  {"title": "Lego Star Wars II: The Original Trilogy", "rating": 7, "platform": "PS2", "year": 2006, "genre": "Action/Adventure"},
  {"title": "Guitar Hero", "rating": 7, "platform": "PS2", "year": 2007, "genre": "Music"},
  {"title": "Mario and Sonic at the Olympic Games", "rating": 4, "platform": "DS", "year": 2007, "genre": "Sports"},
  {"title": "Fossil Fighters", "rating": 8, "platform": "DS", "year": 2008, "genre": "Role-Playing"},
  {"title": "The Legend of Zelda: Phantom Hourglass", "rating": 7, "platform": "DS", "year": 2007, "genre": "Action/Adventure"},
  {"title": "Fire Emblem: Shadow Dragon", "rating": 8, "platform": "DS", "year": 2008, "genre": "Strategy"},
  {"title": "Fossil Fighters Champions", "rating": 8, "platform": "DS", "year": 2011, "genre": "Role-Playing"},
  {"title": "Age of Empires Mythology", "rating": 9, "platform": "DS", "year": 2008, "genre": "Strategy"},
  {"title": "Percy Jackson and the Olympians", "rating": 4, "platform": "DS", "year": 2010, "genre": "Action/Adventure"},
  {"title": "Mario Kart DS", "rating": 7, "platform": "DS", "year": 2005, "genre": "Racing"},
  {"title": "Lego Battles", "rating": 5, "platform": "DS", "year": 2009, "genre": "Strategy"},
  {"title": "Fossil Fighters Frontier", "rating": 6, "platform": "3DS", "year": 2014, "genre": "Role-Playing"},
  {"title": "Fire Emblem: Awakening", "rating": 8, "platform": "3DS", "year": 2013, "genre": "Strategy"},
  {"title": "Mario Kart 7", "rating": 7, "platform": "3DS", "year": 2011, "genre": "Racing"},
  {"title": "Minecraft", "rating": 7, "platform": "Xbox 360", "year": 2012, "genre": "Sandbox"},
  {"title": "Lego Star Wars III: The Clone Wars", "rating": 8, "platform": "Xbox 360", "year": 2011, "genre": "Action/Adventure"},
  {"title": "Halo Reach", "rating": 5, "platform": "Xbox 360", "year": 2010, "genre": "Shooter"},
  {"title": "Halo 4", "rating": 7, "platform": "Xbox 360", "year": 2012, "genre": "Shooter"},
  {"title": "Destiny", "rating": 9, "platform": "Xbox 360", "year": 2014, "genre": "Shooter"},
  {"title": "Terraria", "rating": 6, "platform": "Xbox 360", "year": 2011, "genre": "Sandbox"},
  {"title": "COD: MW3", "rating": 7, "platform": "Xbox 360", "year": 2011, "genre": "Shooter"},
  {"title": "COD: Black Ops 1", "rating": 3, "platform": "Xbox 360", "year": 2010, "genre": "Shooter"},
  {"title": "COD Black Ops 2", "rating": 7, "platform": "Xbox 360", "year": 2012, "genre": "Shooter"},
  {"title": "Skylanders: Spyros Adventure", "rating": 6, "platform": "Xbox 360", "year": 2011, "genre": "Action/Adventure"},
  {"title": "Skyrim", "rating": 7, "platform": "Xbox 360", "year": 2011, "genre": "Role-Playing"},
  {"title": "Skylanders Giants", "rating": 4, "platform": "Xbox 360", "year": 2012, "genre": "Action/Adventure"},
  {"title": "COD: Ghosts", "rating": 5, "platform": "Xbox 360", "year": 2013, "genre": "Shooter"},
  {"title": "Super Mario Bros", "rating": 8, "platform": "Wii", "year": 2009, "genre": "Platformer"},
  {"title": "Mario Kart Wii", "rating": 9, "platform": "Wii", "year": 2008, "genre": "Racing"},
  {"title": "Mario Party 8", "rating": 6, "platform": "Wii", "year": 2007, "genre": "Party"},
  {"title": "Wii Sports", "rating": 7, "platform": "Wii", "year": 2006, "genre": "Sports"},
  {"title": "Wii Play", "rating": 6, "platform": "Wii", "year": 2007, "genre": "Party"},
  {"title": "Donkey Kong Country Returns", "rating": 4, "platform": "Wii", "year": 2010, "genre": "Platformer"},
  {"title": "Super Paper Mario", "rating": 3, "platform": "Wii", "year": 2007, "genre": "Role-Playing"}
]`;

export const exampleResponse = {
  title: "Distribution of Game Ratings",
  insights: [
    "Most games have ratings between 5 and 7.",
    "There are few games with ratings below 5.",
    "There are also few games with ratings above 7.",
  ],
  viz1: {
    vizType: "pie",
    data: [
      {
        label: "1-4",
        value: 6,
      },
      {
        label: "5-7",
        value: 26,
      },
      {
        label: "8-10",
        value: 10,
      },
    ],
  },
  viz2: {
    vizType: "pie",
    data: [
      {
        label: "Gameboy Advance",
        value: 8,
        max: 10,
      },
      {
        label: "PS2",
        value: 8,
        max: 10,
      },
      {
        label: "DS",
        value: 8,
        max: 10,
      },
      {
        label: "3DS",
        value: 3,
        max: 10,
      },
      {
        label: "Xbox 360",
        value: 9,
        max: 10,
      },
      {
        label: "Wii",
        value: 7,
        max: 10,
      },
    ],
  },
};
