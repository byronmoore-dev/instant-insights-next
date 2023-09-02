const logout = async () => {
  try {
    const res = await fetch("/auth/sign-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("logged out");
    } else {
      throw new Error(res.statusText);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export default function SignoutButton() {
  return (
    <button onClick={() => logout()} className="w-full rounded-md bg-gray-700 py-2 text-white">
      Logout
    </button>
  );
}
