import reportImg from "@/assets/images/blood-report.webp";
import reportimg2x from "@/assets/images/blood-report-2.webp";

import css from "./EmptyState.module.css";
import { Link } from "react-router-dom";

function EmptyState() {
  return (
    <div className={css.wrapper}>
      <picture className={css.image}>
        <source
          srcSet={`${reportImg} 1x, ${reportimg2x} 2x`}
          type="image/webp"
        />
        <img
          src={reportImg}
          alt="Report"
          loading="lazy"
          width="144"
          height="166"
        />
      </picture>
      <div className={css.wrapperContent}>
        <div className={css.wrapperText}>
          <h3 className={css.title}>
            You don't have a single word to learn right now.{" "}
          </h3>
          <p className={css.text}>
            Please create or add a word to start the workout. We want to improve
            your vocabulary and develop your knowledge, so please share the
            words you are interested in adding to your study.
          </p>
        </div>
        <div className={css.wrapperBtn}>
          <Link
            to="/dictionary"
            state={{ openModal: true }}
            className={css.btnAdd}
          >
            Add word
          </Link>
          <Link to="/dictionary" className={css.btnCancel}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
