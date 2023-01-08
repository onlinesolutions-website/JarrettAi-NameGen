import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [startupInput, setStartupInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startup: startupInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setStartupInput("");
  }

  return (
    <div>
      <Head>
        <title>Keyword Generator by JarrettAi</title>
        <link rel="icon" href="/shuttle.png" />
      </Head>

      <main className={styles.main}>
        <img src="/shuttle.png" className={styles.icon} />
        <center><h3>JarrettAi Keyword Gen</h3></center>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="startup"
            placeholder="Enter Keywords to Generate Names"
            value={startupInput}
            onChange={(e) => setStartupInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
      <footer className={styles.footer}>
        Made by <a href="https://jarrettai.online/">JarrettAi</a>
      </footer>
    </div>
  );
}
