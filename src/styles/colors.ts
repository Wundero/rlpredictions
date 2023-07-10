const _colorObject = Object.freeze({
    transparent: "transparent",
    current: "currentColor",
  
    primary: withOpacityValue("--p"),
    "primary-focus": withOpacityValue("--pf", "--p"),
    "primary-content": withOpacityValue("--pc"),
  
    secondary: withOpacityValue("--s"),
    "secondary-focus": withOpacityValue("--sf", "--s"),
    "secondary-content": withOpacityValue("--sc"),
  
    accent: withOpacityValue("--a"),
    "accent-focus": withOpacityValue("--af", "--a"),
    "accent-content": withOpacityValue("--ac"),
  
    neutral: withOpacityValue("--n"),
    "neutral-focus": withOpacityValue("--nf", "--n"),
    "neutral-content": withOpacityValue("--nc"),
  
    "base-100": withOpacityValue("--b1"),
    "base-200": withOpacityValue("--b2", "--b1"),
    "base-300": withOpacityValue("--b3", "--b2"),
    "base-content": withOpacityValue("--bc"),
  
    info: withOpacityValue("--in"),
    "info-content": withOpacityValue("--inc", "--nc"),
  
    success: withOpacityValue("--su"),
    "success-content": withOpacityValue("--suc", "--nc"),
  
    warning: withOpacityValue("--wa"),
    "warning-content": withOpacityValue("--wac", "--nc"),
  
    error: withOpacityValue("--er"),
    "error-content": withOpacityValue("--erc", "--nc"),
  } as const);
  
  function withOpacityValue(variable: string, fallbackColor?: string) {
    return ({ opacityValue }: { opacityValue?: string }) => {
      let fallbackColorValue = "";
      if (fallbackColor) {
        fallbackColorValue = `, var(${fallbackColor})`;
      }
      if (opacityValue === undefined) {
        return `hsl(var(${variable}${fallbackColorValue}))`;
      }
      return `hsl(var(${variable}${fallbackColorValue}) / ${opacityValue})`;
    };
  }
  
  export const parseColor = (color: string) => {
    if (color.startsWith("#")) {
      return color;
    }
    if (color.includes("/")) {
      const [colorName, opacityValue] = color.split("/");
      const val = _colorObject[colorName as keyof typeof _colorObject];
      if (typeof val === "string") {
        return val;
      }
      return val({ opacityValue });
    } else {
      const val = _colorObject[color as keyof typeof _colorObject];
      if (typeof val === "string") {
        return val;
      }
      return val({});
    }
  };
  