import * as React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";

export default function MenuSimple(props) {
  const updateStatus = async (status) => {
    let fm = new FormData();
    fm.append("status", status);
    await props.updateOrder(props.id, fm);
  };

  return (
    <Dropdown>
      <MenuButton className={props.status}>
        {status.find((e) => e.en === props.status)?.ar}
      </MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        {status
          .filter((s) => s.en !== props.status)
          .map((e) => (
            <MenuItem
              onClick={() => {
                updateStatus(e.en);
              }}
              key={e.en}
            >
              {e.ar}
            </MenuItem>
          ))}
      </Menu>
    </Dropdown>
  );
}

const status = [
  { en: "not started", ar: "لم يبدأ", color: "#6c757d" }, // Gray: Neutral/Inactive
  { en: "started", ar: "تم البدء  ", color: "#17a2b8" }, // Cyan: In Progress
  { en: "preparing", ar: "قيد التحضير", color: "#ffc107" }, // Yellow: Preparing/Waiting
  { en: "finished", ar: "انتهى التحضير", color: "#28a745" }, // Green: Success/Completed
  { en: "in the way", ar: "في الطريق", color: "#007bff" }, // Blue: On its way
  { en: "complete", ar: "اكتمل", color: "#20c997" }, // Teal: Fully Complete
  { en: "cancel", ar: "مرفوض", color: "#dc3545" }, // Red: Cancelled/Rejected
  { en: "deleted", ar: "تم المسح", color: "#343a40" }, // Dark Gray: Deleted/Removed
];
const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'cairo', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 120px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0 4px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  z-index: 1;
  `
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'cairo', sans-serif;
  font-weight: 600;
  width:100px;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  color:#fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    opacity:0.7
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }
  `
);
