interface SnackbarWithTextOnly {
  text: string;
}

interface SnackbarWithButton {
  text: string;
  buttonText: string;
  callback: () => void;
}

export type SnackbarOptions = SnackbarWithTextOnly | SnackbarWithButton;
