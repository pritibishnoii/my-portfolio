import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={ styles.container }>
      <div className={ styles.content }>
        <h1 className={ styles.title }>Hi, I'm Priti</h1>
        <p className={ styles.description }>
          I'm a full-stack developer with 1 years of experience using React and
          NodeJS. Reach out if you'd like to learn more!
        </p>
        <div >
          <a href="mailto:priti12bishnoi@gmail.com" className={ styles.contactBtn }>
            Contact Me
          </a>
          <a href="assets/Resume_Pritiii.pdf" download class={ styles.contactBtn }>Download CV</a>
        </div>
      </div>
      <img
        src={ getImageUrl( "hero/heroImage.png" ) }
        alt="Hero image of me"
        className={ styles.heroImg }
      />
      <div className={ styles.topBlur } />
      <div className={ styles.bottomBlur } />
    </section>
  );
};
