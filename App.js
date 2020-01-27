import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';



export default class App extends React.Component {
  // let [location, selectedTree] = React.useState(null)
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: 40.78343,
        longitude: -73.96625,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      loading: true,
      treeMarkers: []
    }
  //  this.fetchTreeData = this.fetchTreeData.bind(this)
  }

  async componentDidMount() {
    // this.fetchTreeData()
    await this.fetchTreeData()

  }

  async fetchTreeData() {
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/5rq2-4hqu.json?zip_city=New%20York&$select=tree_id,%20spc_common,%20the_geom,%20spc_latin&$limit=50000')
      const treeMarkers = await response.json()
      // console.log(treeMarkers)
      this.setState({
        loading: false,
        treeMarkers: treeMarkers
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  // renderTreeMarkers() {
  //   this.state.treeMarkers.map((tree, index) => {

  //     const coordinates = {
  //       latitude: tree.the_geom.coordinates[1],
  //       longitude: tree.the_geom.coordinates[0]
  //     }

  //     const commonName = tree.spc_common
  //     const latinName = tree.spc_latin

  //     return (
  //       <MapView.Marker
  //         key = {index}
  //         coordinate = {coordinates}
  //         title = {commonName}
  //         description = {latinName}
  //       >
  //       </MapView.Marker>
  //     )
  //   })
  // }

  render() {
    console.log(this.state.treeMarkers.length)
    return (
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={this.state.region} showsUserLocation={true}
      >
        {this.state.isloading ? null : this.state.treeMarkers.map((tree, index) => {
          const coordinates = {
            latitude: tree.the_geom.coordinates[1],
            longitude: tree.the_geom.coordinates[0]
          }
          const commonName = tree.spc_common
          const latinName = tree.spc_latin

          return (
            <Marker
              key = {index}
              coordinate = {coordinates}
              title = {commonName}
              description = {latinName}
              pinColor = "green"
            >
            </Marker>
          )
        })
        }
      </MapView>
      {/* <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={{backgroundColor:'red'}}>
          <Text style={{fontSize:20, color: '#fff'}}>Say Hello</Text>
      </TouchableOpacity> */}
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }

});
