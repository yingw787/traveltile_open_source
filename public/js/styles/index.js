const styles = {
    addCalendarButtonStyle: {
        border: '1px solid black',
        minHeight: '40px',
        maxWidth: '40px',
    },
    ImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    alignElementInCenter: {
        textAlign: 'center',
        width: 'calc(100%)',
    },
    browserVerticallyCenterElement: {
        textAlign: 'center',
        marginTop: '8vh',
        marginBottom: '8vh',
    },
    TiledCalendarStyle: {
        minHeight: '450px',
        maxHeight: '450px',
        overflowY: 'scroll',
    },
    CalendarTileStyle: {
        marginLeft: '1px',
        marginRight: '1px',
        paddingTop: '10px',
        paddingLeft: '25px',
        paddingRight: '25px',
        marginBottom: '20px',
        minHeight: '175px',
    },
    CalendarTileDeleteButtonStyle: {
        paddingBottom: '25px',
    },
    defaultFont: {
        fontFamily: 'Roboto',
    },
    editorHorizontallyCenterElement: {
        width: '100%',
        display: 'inline-block',
        margin: 'auto',
        verticalAlign: 'top',
    },
    editorHorizontallyCenterFooterElement: {
        paddingTop: '40px',
        paddingBottom: '40px',
        textAlign: 'center',
    },
    editorVerticallyCenterElement: {
        textAlign: 'center',
        marginTop: '10vh',
    },
    homePageHorizontallyCenterElement: {
        margin: 'auto',
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    homePageTileStyle: {
        width: '400px',
        height: '600px',
        margin: 'auto',
        marginTop: '15vh',
        backgroundColor: 'rgba(255, 0, 0, 0)',
        opacity: '0.5',
    },
    homePageHorizontallyCenterTile: {
        border: '0px solid black',
        height: '300px',
        textAlign: 'center',
    },
    homePageOpaqueForeground: {
        paddingTop: '75px',
        position: 'relative',
        bottom: '40vh',
    },
    homePageOverlayStyle: {
        textAlign: 'center',
    },
    homePageTileTextStyle: {
        fontSize: '20px',
        textAlign: 'center',
        marginLeft: '15px',
        marginRight: '15px',
        paddingBottom: '75px',
    },
    homePageTileTitleStyle: {
        fontSize: '40px',
        paddingTop: '150px',
        fontFamily: 'Open Sans',
    },
    homePageTokyoBackgroundImage: {
        backgroundImage: 'url("../../images/tokyo.jpg")',
        backgroundSize: 'cover',
    },
    homePageVerticallyCenterElement: {
        marginTop: '0vh',
    },
    raisedButtonStyle: {
        margin: 12,
    },
    traveltileExpandedSizeStyle: {
        width: '500px', // calc(50% - 200px) original responsive but nuka-carousel doesn't play well with responsiveness.
        minWidth: '400px',
        display: 'inline-block',
        verticalAlign: 'top',
    },
    traveltileExpandedSizeViewCardTitleStyle: {
        textAlign: 'left',
        padding: '10px',
        height: '50px',
        paddingLeft: '15px',
        fontSize: '20px',
    },
    traveltileExpandedSizeViewLargeCardStyle: {
        minHeight: '300px',
        height: '300px',
        maxHeight: '300px',
        margin: '20px',
        position: 'relative',
    },
    traveltileExpandedSizeViewFooterStyle: {
        height: 'calc(100%)',
        flexGrow: '1',
    },
    traveltileExpandedSizeViewSmallCardStyle: {
        minHeight: '150px',
        margin: '20px',
    },
    traveltileRegularSizeFooter: {
        height: 'calc(25%)',
        padding: '10px',
    },
    traveltileRegularSizeFooterCard: {
        height: 'calc(100%)',
        paddingTop: '15px',
    },
    traveltileRegularSizeStyle: {
        height: '600px',
        minWidth: '400px',
        textAlign: 'center',
        position: 'absolute',
    },
    traveltileSubcardBodyStyle: {
        height: 'calc(80.5%)', // TODO: Height of this is not natural, may break later on
        display: 'inline-block',
        width: '100%',
        position: 'relative',
        paddingBottom: '1.5em',
    },
    tiledEventsCalendarStyle: {
        textAlign: 'center',
        width: 'calc(100%)',
        paddingTop: '25px',
    },
    traveltileSubcardDialogFinanceTableStyle: {
        paddingTop: '20px',
        minHeight: '550px',
        maxHeight: '550px',
        overflowY: 'scroll',
    },
    SubcardDialogItineraryWrapperStyle: {
        paddingTop: '25px',
    },
    traveltileSubcardDialogNotesDisplayStyle: {
        fontSize: '17px',
        paddingTop: '10px',
    },
    traveltileSubcardDialogBodyStyle: {
        minHeight: '500px',
        height: '500px',
    },
    traveltileSubcardNotesStyle: {
        paddingLeft: '15px',
        paddingRight: '15px',
        textAlign: 'left',
        height: 'calc(100%)',
        width: 'calc(100%)',
        right: 0,
        top: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
    },
    traveltileSubcardBodyItineraryStyle: {
        fontSize: '17px',
    },
};

module.exports = styles;
