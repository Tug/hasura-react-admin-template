import { defaultTheme } from 'react-admin';
import { merge } from 'lodash';

export default merge({}, defaultTheme, {
	palette: {
		secondary: {
			light: '#5f5fc4',
			main: '#283593',
			dark: '#001064',
			contrastText: '#fff',
		},
	},
	overrides: {
		MuiFilledInput: {
			root: {
				backgroundColor: 'rgba(0, 0, 0, 0.04)',
				'&$disabled': {
					backgroundColor: 'rgba(0, 0, 0, 0.04)',
				},
			},
		},
	},
});
