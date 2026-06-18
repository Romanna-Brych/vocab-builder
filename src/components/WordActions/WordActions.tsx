import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import sprite from "@/assets/icons/sprite.svg";
import css from "./WordActions.module.css";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function WordActions({ onEdit, onDelete }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit();
    handleClose();
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <div className={css.wrapper}>
      <button
        type="button"
        className={css.menuBtn}
        onClick={handleOpen}
        aria-label="Open word actions"
      >
        ...
      </button>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            className: css.menu,
          },
          list: { disablePadding: true },
        }}
      >
        <MenuItem
          onClick={handleEdit}
          disableRipple
          sx={{ p: 0, width: "100%" }}
        >
          <button type="button" className={css.actionBtn}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-edit`} />
            </svg>
            Edit
          </button>
        </MenuItem>

        <MenuItem
          onClick={handleDelete}
          disableRipple
          sx={{ p: 0, width: "100%" }}
        >
          <button type="button" className={css.actionBtn}>
            <svg className={css.icon}>
              <use href={`${sprite}#icon-trash`} />
            </svg>
            Delete
          </button>
        </MenuItem>
      </Menu>
    </div>
  );
}
