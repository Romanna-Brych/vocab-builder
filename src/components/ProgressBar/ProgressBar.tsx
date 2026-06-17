import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type Props = {
  value: number;
  size?: number;
  showTextInside?: boolean;
  color?: string;
};

export default function ProgressBar({
  value,
  size = 26,
  showTextInside = false,
  color = "#5BCE4E",
}: Props) {
  const normalizedValue = Math.min(Math.max(value, 0), 100);

  const strokeThickness = size > 50 ? 4.5 : 5.5;

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={strokeThickness}
        sx={{
          color: "rgba(18, 20, 23, 0.1)",
          position: "absolute",
        }}
      />

      <CircularProgress
        variant="determinate"
        value={normalizedValue}
        size={size}
        thickness={strokeThickness}
        sx={{
          color: color,
          strokeLinecap: "round",
          position: "absolute",
        }}
      />

      {showTextInside && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontWeight: 600,
              fontSize: size > 50 ? "16px" : "12px",
              color: "var(--color-text-primary)",
              lineHeight: 1,
            }}
          >
            {Math.round(value)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
