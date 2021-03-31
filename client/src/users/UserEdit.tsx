import * as React from 'react';
import { FC } from 'react';
import {
    BooleanInput,
    DateField,
    Edit,
    EditProps,
    FormWithRedirect,
    Labeled,
    required,
    ReferenceField,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    Toolbar,
    useMutation,
    useNotify,
    useRedirect,
    useTranslate,
    useUpdate,
} from 'react-admin';
import { Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';

interface UserTitleProps {
    record?: any; //User;
}

const UserTitle: FC<UserTitleProps> = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
			{translate('resources.users.title', {
                reference: record.reference,
            })}
		</span>
    ) : null;
};

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const UserEdit: FC<any> = ({ permissions, ...props }: { permissions: any, props: any }) => {
    const classes = useEditStyles();
    const translate = useTranslate();
    const notify = useNotify();
    const redirect = useRedirect();
    const [mutate, { loading }] = useMutation();


    const handleSubmit = async (values: { id: string, display_name: string, account: { id: string, default_role: string } }) => {
        try {
            await mutate({
                type: 'update',
                resource: 'users',
                payload: {
                    id: values.id,
                    data: {
                        display_name: values.display_name
                    }
                },
            });
            await mutate({
                type: 'update',
                resource: 'auth_accounts',
                payload: {
                    id: values.account.id,
                    data: {
                        default_role: values.account.default_role
                    }
                },
            });
            notify('User updated!');
            redirect('/users');
        } catch(error) {
            notify(error.message, 'error');
        }
    };

    return (
        <Edit title={<UserTitle />} classes={classes} {...props} component="div">
            <SimpleForm save={handleSubmit}>
                <Field name="id" component="input" type="hidden"/>
                <TextInput source="account.email" label="E-mail" disabled />
                <TextInput source="display_name" label="Name" />
                {permissions && permissions.includes('admin') && (
                    <SelectInput
                        label="resources.users.role"
                        source="account.default_role"
                        validate={required()}
                        choices={[
                            { id: 'admin', name: 'Admin' },
                            { id: 'orgAdmin', name: 'Organisation Admin' },
                            { id: 'user', name: 'User' },
                        ]}
                        defaultValue={'user'}
                    />
                )}
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;
