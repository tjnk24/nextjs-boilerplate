import {Typography} from 'antd';
import {PureComponent} from 'react';

import EnhancedButton from '__components/EnhancedButton';
import {ROUTES} from '__routes';

import {Props, State} from './types';

export default class ErrorBoundary extends PureComponent<Props, State> {
    public state: State = {
        error: null,
        errorInfo: null,
    };

    private onGoToUsersClick = (event: React.MouseEvent) => {
        event.preventDefault();
        window.location.assign(ROUTES.USERS.INDEX);
    };

    public componentDidCatch(error: Error, errorInfo: unknown) {
        this.setState({error, errorInfo});
    }

    public render() {
        const {state} = this;
        const {children} = this.props;

        if (state.errorInfo) {
            return (
                <>
                    <Typography.Text>
                        Something went wrong, application crashed
                    </Typography.Text>

                    <br/>

                    <br/>

                    <EnhancedButton
                        buttonProps={{
                            onClick: this.onGoToUsersClick,
                        }}
                    >
                        Return to users page
                    </EnhancedButton>
                </>
            );
        }

        return children;
    }
}
