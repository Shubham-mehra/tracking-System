// components/HistoryTimeline.tsx
import React, { useState } from "react";
import styles from "../myhistory/history.module.scss"

const historyData = [
  { year: "2002", text: "Company was founded." },
  { year: "2005", text: "Acquired by Algeco, leader in modular space." },
  { year: "2007", text: "Expanded to international markets." },
  { year: "2010", text: "Launched first eco product line." },
  { year: "2015", text: "Reached 1 million customers." },
];

const HistoryTimeline = () => {
  const [current, setCurrent] = useState(2); // default selected index

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const goNext = () => {
    if (current < historyData.length - 1) setCurrent(current + 1);
  };

  return (
    <div className={styles.timelineWrapper}>
      <h2>Over 50 Years</h2>
      <p>Click on a year below to see our history.</p>

      <div className={styles.timeline}>
        <button onClick={goPrev} className={styles.arrowBtn}>&lt;</button>
        
        <div className={styles.steps}>
          {historyData.map((item, index) => (
            <div
              key={item.year}
              className={`${styles.step} ${index === current ? styles.active : ""}`}
              onClick={() => setCurrent(index)}
            >
              <div className={styles.circle}>
                {index === current ? <strong>{item.year}</strong> : item.year}
              </div>
              {index < historyData.length - 1 && <div className={styles.line}></div>}
            </div>
          ))}
        </div>

        <button onClick={goNext} className={styles.arrowBtn}>&gt;</button>
      </div>

      <div className={styles.description}>
        {historyData[current].text}
      </div>
    </div>
  );
};

export default HistoryTimeline;
