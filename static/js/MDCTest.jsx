import React, { Component } from 'react';
import Button from '@material/react-button';

class MDCTest extends Component {
    render() {
        return (
            <div>
                <Button
                    raised
                    className='button-alternate'
                    onClick={() => console.log('clicked!')}
                >
                    Click Me!
                </Button>
                <Button
                    raised
                    className='button'
                    onClick={() => console.log('clicked!')}
                >
                    Click Me!
                </Button>
            </div>
        );
    }
}

export default MDCTest;