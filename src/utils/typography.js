import Typography from 'typography';
import Doelger from 'typography-theme-doelger';
import CodePlugin from 'typography-plugin-code';

Doelger.plugins = [new CodePlugin()];

Doelger.overrideThemeStyles = () => ({
  a: {
    backgroundImage: '',
    textShadow: '',
  },
});

Doelger.baseFontSize = '18px';
Doelger.baseLineHeight = '1.8';

const typography = new Typography(Doelger);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
