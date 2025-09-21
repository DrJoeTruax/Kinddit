export default async function Home() {
  const base = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
  const res = await fetch(`${base}/posts`, { cache: "no-store" });
  const posts = res.ok ? await res.json() : [];
  return (
    <main style={{padding:20,fontFamily:"system-ui"}}>
      <h1>Kinddit</h1>
      <p>Safe-by-design, no DMs. Create a post via API to see it here.</p>
      <ul>{posts.map((p:any)=>(<li key={p.id}><b>{p.title}</b></li>))}</ul>
    </main>
  );
}
