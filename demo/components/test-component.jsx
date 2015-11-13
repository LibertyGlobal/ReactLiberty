class TestComponent extends React.Component {
    componentDidMount() {
        this.setState({
            displacement: 0
        });

        /* setInterval(() => {
            this.setState({
                displacement: this.state.displacement + 10
            });
        }, 100); */
    }

    render() {
        var styles = {
            main: {
                padding: 20,
                margin: 20,
                flexDirection: 'column'
            },
            image: {
                width: 100,
                height: 100,
                alignSelf: 'stretch'
            },
            text1: {
                marginTop: 120,
                flexWrap: 'wrap',
            },
            text2: {
                width: 100,
                height: 100
            }
        }

        var displacement = this.state && this.state.displacement || 0;

        return <ReactPixi.Container style={styles.main}>
            <ReactPixi.Image style={styles.image} src="./assets/game_of_thrones.jpg"
                             key="3"/>
            <ReactPixi.Text style={styles.header} text="Some text" key="1"/>
            <ReactPixi.Text style={styles.header} text="ABC" key="2"/>
        </ReactPixi.Container>;
    }
}

window.TestComponent = TestComponent;