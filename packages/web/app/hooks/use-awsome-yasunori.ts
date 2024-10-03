export async function useAwesomeYasunori() {
  const res = await fetch("https://api.yasunori.dev/awesome");
  if (res.ok) {
    const json =
      await res.json<
        {
          id: number;
          title: string;
          content: string;
          date: string;
          at: string;
          senpan: string;
          meta: string;
        }[]
      >();

    return json;
  }
  return null;
}
