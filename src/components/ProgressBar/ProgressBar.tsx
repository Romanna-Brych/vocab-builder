import css from "./ProgressBar.module.css";

type Props = {
  value?: number;
};

export default function ProgressBar({ value = 0 }: Props) {
  return (
    <div className={css.wrapper}>
      <span className={css.value}>{value}%</span>
      <span className={css.circle} aria-hidden="true" />
    </div>
  );
}
