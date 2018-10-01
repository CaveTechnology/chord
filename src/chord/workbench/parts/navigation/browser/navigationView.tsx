'use strict';

import 'chord/css!./media/navigationView';

import * as React from 'react';

import { isWindows } from 'chord/base/common/platform';

import Search from 'chord/workbench/parts/navigation/browser/component/search';
import Comeback from 'chord/workbench/parts/navigation/browser/component/comeback';
import Library from 'chord/workbench/parts/navigation/browser/component/library';


export function NavigationView() {
    return (
        <div className='nav-bar-container'>
            {/* Search */}
            <div className='navBar' style={isWindows ? null : {'padding-top': '40px'}}>
                <div className='navBar-expand'>
                    <ul>

                        <li className='navBar-group'>
                            <Comeback />
                        </li>

                        <li className='navBar-group'>
                            <Search />
                        </li>

                        <li className='navBar-group'>
                            <Library />
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    );
}
