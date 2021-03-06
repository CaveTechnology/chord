'use strict';

import * as React from 'react';
import { connect } from 'react-redux';

import { IStateGlobal } from 'chord/workbench/api/common/state/stateGlobal';
import { IAlbumMenuProps } from 'chord/workbench/parts/menu/browser/props/albumMenu';

import { handleAddLibraryAlbum } from 'chord/workbench/parts/mainView/browser/action/addLibraryItem';
import { handleAddToQueue } from 'chord/workbench/parts/player/browser/action/addToQueue';
import { handleRemoveFromLibrary } from 'chord/workbench/parts/mainView/browser/action/removeFromLibrary';

import { defaultLibrary } from 'chord/library/core/library';


class AlbumMenu extends React.Component<IAlbumMenuProps, any> {

    menu: React.RefObject<HTMLDivElement>

    constructor(props: IAlbumMenuProps) {
        super(props);

        this.menu = React.createRef();
    }

    shouldComponentUpdate(nextProps: IAlbumMenuProps) {
        if (this.menu.current) { this.menu.current.style.display = 'block'; }
        return true;
    }

    render() {
        let album = this.props.album;
        if (!album) {
            return null;
        }

        let top = this.props.top;
        let left = this.props.left;

        let like = defaultLibrary.exists(album);
        album.like = like;

        let addLibraryItem = album && (!like ? (
            <div className="react-contextmenu-item" role="menuitem" tabIndex={-1}
                onClick={() => this.props.handleAddLibraryAlbum(album)}>
                Save to your Favorite Albums</div>
        ) : null);

        let removeFromLibraryItem = album && (like ? (
            <div className="react-contextmenu-item" role="menuitem" tabIndex={-1}
                onClick={() => this.props.handleRemoveFromLibrary(album)}>
                Remove from library</div>
        ) : null);

        return this.props.view == 'albumMenuView' ? (
            <nav ref={this.menu} role="menu" tabIndex={-1} className="react-contextmenu"
                style={{ position: 'fixed', opacity: '1', pointerEvents: 'auto', top: `${top}px`, left: `${left}px` }}>

                {addLibraryItem}
                <div className="react-contextmenu-item" role="menuitem" tabIndex={-1}
                    onClick={() => this.props.handleAddToQueue(album, 'tail')}>
                    Add to Queue (After)</div>
                <div className="react-contextmenu-item" role="menuitem" tabIndex={-1}
                    onClick={() => this.props.handleAddToQueue(album, 'head')}>
                    Add to Queue (Before)</div>
                {/*<div className="react-contextmenu-item" role="menuitem" tabIndex={-1}>Add to Playlist</div>*/}
                {removeFromLibraryItem}

            </nav>
        ) : null;
    }
}


function mapStateToProps(state: IStateGlobal) {
    return {
        ...state.menu.albumMenu,
        view: state.menu.view
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleAddLibraryAlbum: (album) => dispatch(handleAddLibraryAlbum(album)),
        handleAddToQueue: (item, direction) => handleAddToQueue(item, direction).then(act => dispatch(act)),
        handleRemoveFromLibrary: (item) => dispatch(handleRemoveFromLibrary(item)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumMenu);
