export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="bg-gray-700 w-full py-2 rounded-md text-white">Logout</button>
    </form>
  );
}
