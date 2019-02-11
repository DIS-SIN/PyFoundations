import React, { Component } from 'react';
import Card, {
    CardPrimaryContent,
    CardMedia,
    CardActions,
    CardActionButtons,
    CardActionIcons
} from "@material/react-card";


class MDCCard extends Component {
    render() {
        return (
            <Card
                className='card-alternate'
            >
                <CardPrimaryContent>
                    <h1>Header</h1>
                    <CardMedia imageUrl='/static/images/weasel.jpg' />
                </CardPrimaryContent>

                <CardActions>
                    <CardActionButtons>
                        <button>Click Me</button>
                    </CardActionButtons>

                    <CardActionIcons>
                        <i>Click Me Too!</i>
                    </CardActionIcons>
                </CardActions>
            </Card>
        );
    }
}

export default MDCCard;