const React = require('react');
const styles = require('../styles');
const ReactRouter = require('react-router');
const Link = ReactRouter.Link;

import {Paper, CardTitle, CardText, RaisedButton} from 'material-ui';

const HomePageWindow = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },
    handleCreateNewTile() {
        this.context.router.push({
            pathname: '/editor',
            query: {
                tileId: 'fromNew',
            },
        });
    },
    render() {
        // TODO: Take a look at the styling here again...
        return (
            <div style={Object.assign(styles.homePageHorizontallyCenterElement, styles.homePageTokyoBackgroundImage)}>
                <div style={styles.homePageVerticallyCenterElement}>
                    <div style={styles.homePageOverlayStyle}>
                        <div style={styles.homePageHorizontallyCenterTile}>
                            <Paper style={styles.homePageTileStyle} zDepth={2}/>
                        </div>
                        <div style={styles.homePageOpaqueForeground}>
                            <CardTitle style={styles.homePageTileTitleStyle}>Traveltile</CardTitle>
                            <CardText style={styles.homePageTileTextStyle}>Organize your travels into beautiful tiles.</CardText>
                            <Link to="/browse">
                                <RaisedButton label="Browse tiles" style={styles.raisedButtonStyle} />
                            </Link>
                            <RaisedButton label="Build your own tile" style={styles.raisedButtonStyle} onTouchTap={this.handleCreateNewTile}/>
                        </div>

                    </div>

                </div>
            </div>
      );
    },
});

module.exports = HomePageWindow;
