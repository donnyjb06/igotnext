import { Analytics } from "@vercel/analytics/react"

export default async function Home() {
  return (
    <>
      <div>Home Page</div>
      <Analytics />
    </>
    
  );
}
