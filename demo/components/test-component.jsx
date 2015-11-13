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
            },
            text1: {
                marginTop: 10,
                height: 30
            }
        }

        var displacement = this.state && this.state.displacement || 0;

        return <ReactPixi.Container style={styles.main}>
            <ReactPixi.Image style={styles.image} src="./assets/game_of_thrones.jpg"
                             key="3"/>
            <ReactPixi.Text style={styles.text1} text="Some text" key="1"/>
            <ReactPixi.Text style={styles.text2} text="ABC" key="2"/>
        </ReactPixi.Container>;
    }
}

window.TestComponent = TestComponent;