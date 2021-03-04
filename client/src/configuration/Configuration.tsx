import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useTranslate, useLocale, useSetLocale, Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { changeTheme } from '../state/theme/actions';
import { AppState } from '../types';
import { supportedLocales } from 'providers/i18n';

const useStyles = makeStyles({
	label: { width: '10em', display: 'inline-block' },
	button: { margin: '1em' },
});

const Configuration = () => {
	const translate = useTranslate();
	const currentLocale = useLocale();
	const setLocale = useSetLocale();
	const classes = useStyles();
	const theme = useSelector((state: AppState) => state.theme);
	const dispatch = useDispatch();
	return (
		<Card>
			<Title title={translate('admin.configuration.title')} />
			<CardContent>
				<div className={classes.label}>
					{translate('admin.configuration.theme')}
				</div>
				<Button
					variant="contained"
					className={classes.button}
					color={theme === 'light' ? 'primary' : 'default'}
					onClick={() => dispatch(changeTheme('light'))}
				>
					{translate('admin.configuration.themes.light')}
				</Button>
				<Button
					variant="contained"
					className={classes.button}
					color={theme === 'dark' ? 'primary' : 'default'}
					onClick={() => dispatch(changeTheme('dark'))}
				>
					{translate('admin.configuration.themes.dark')}
				</Button>
			</CardContent>
			<CardContent>
				<div className={classes.label}>{translate('admin.configuration.language')}</div>
				{ supportedLocales.map( ( locale) => (
					<Button
						key={locale}
						variant="contained"
						className={classes.button}
						color={currentLocale === locale ? 'primary' : 'default'}
						onClick={() => setLocale(locale)}
					>
						{ translate(`admin.configuration.languages.${locale}`) }
					</Button>
				) ) }
			</CardContent>
		</Card>
	);
};

export default Configuration;
