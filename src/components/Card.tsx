import type { ReactNode } from "react";

export default function Card(props: { children: ReactNode }) {
  return <div className="card" style={{ padding: 16 }}>{props.children}</div>;
}
