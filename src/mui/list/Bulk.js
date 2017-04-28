import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FieldTitle from '../../util/FieldTitle';
import translate from '../../i18n/translate';

export class Bulk extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.state = {
            open: false,
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleTouchTap(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    handleShow(event) {
        const { key, defaultValue } = event.currentTarget.dataset;
        this.props.startAction(key, defaultValue);
        this.setState({
            open: false,
        });
    }

    render() {
        const { children, resource } = this.props;
        const { open, anchorEl } = this.state;

        return (children.length > 0 && <div style={{ display: 'inline-block' }}>
            <FlatButton
                className="bulk-action"
                primary
                label={this.props.translate('aor.action.bulk_action')}
                icon={<ContentFilter />}
                onTouchTap={this.handleTouchTap}
            />
            <Popover
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                onRequestClose={this.handleRequestClose}
            >
                <Menu>
                    {children.map(filterElement =>
                        <MenuItem
                            className="bulk-action-item"
                            data-key={filterElement.props.source}
                            data-default-value={filterElement.props.defaultValue}
                            key={filterElement.props.source}
                            primaryText={<FieldTitle label={filterElement.props.label} source={filterElement.props.source} resource={resource} />}
                            onTouchTap={this.handleShow}
                        />
                    )}
                </Menu>
            </Popover>
        </div>);
    }
}

Bulk.propTypes = {
    children: PropTypes.node,
    startAction: PropTypes.func.isRequired,
    translate: PropTypes.func.isRequired,
};

export default translate(Bulk);
