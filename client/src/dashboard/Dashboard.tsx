import React, {
	useState,
	useEffect,
	useCallback,
	FC,
	CSSProperties,
} from 'react';
import { useVersion } from 'react-admin';
import { useMediaQuery, Theme } from '@material-ui/core';

import Welcome from './Welcome';

const styles = {
	flex: { display: 'flex' },
	flexColumn: { display: 'flex', flexDirection: 'column' },
	leftCol: { flex: 1, marginRight: '0.5em' },
	rightCol: { flex: 1, marginLeft: '0.5em' },
	singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard: FC = () => {
	//const version = useVersion();
	const isXSmall = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('xs'),
	);
	const isSmall = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down('md'),
	);

	return isXSmall ? (
		<div>
			<div style={styles.flexColumn as CSSProperties}>
				<Welcome />
			</div>
		</div>
	) : isSmall ? (
		<div style={styles.flexColumn as CSSProperties}>
			<div style={styles.singleCol}>
				<Welcome />
			</div>
			<div style={styles.flex}>
				<Spacer />
			</div>
			<div style={styles.singleCol}></div>
			<div style={styles.singleCol}></div>
		</div>
	) : (
		<>
			<Welcome />
			<div style={styles.flex}>
				<div style={styles.leftCol}>
					<div style={styles.flex}>
						<Spacer />
					</div>
					<div style={styles.singleCol}></div>
					<div style={styles.singleCol}></div>
				</div>
				<div style={styles.rightCol}>
					<div style={styles.flex}>
						<Spacer />
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
