import styles from "./Picture.module.css";

const Picture = () => {
    return (
      <article className={styles.article_abt_us}>
        <picture className={styles.picture} style={{filter:"brightness(40%)"}}>
          <img src="https://raw.githubusercontent.com/Ishan1414/PowerMechEngg/master/aboutus.jpg" alt="background" class="img-fluid" width={'100%'}/>
        </picture>
        <h1 className={styles.header} width={'100%'}>PowerMech Engineering Systems - One Stop Solution for all your Manufacturing Needs</h1>
      </article>
    );
  };
  
export default Picture;