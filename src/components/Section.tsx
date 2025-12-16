import type { ReactNode } from "react";

export default function Section(props: {
  kicker?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section style={{ marginTop: 22 }}>
      {props.kicker ? <div className="kicker">{props.kicker}</div> : null}
      <h2 className="sectionTitle">{props.title}</h2>
      {props.children}
    </section>
  );
}
