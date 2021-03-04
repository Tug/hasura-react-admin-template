import { defaultTheme } from 'react-admin';
import { merge } from 'lodash';

export default merge({}, defaultTheme, {
	palette: {
		primary: {
			main: '#90caf9',
		},
		type: 'dark', // Switching the dark mode on is a single property value change.
	},
});
