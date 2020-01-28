import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Picker } from 'react-native';



export default class App extends React.Component {
  // let [location, selectedTree] = React.useState(null)
  constructor(props) {
    super(props)
    this.state = {
      initialRegion: {
        latitude: 40.7484,
        longitude: -73.9857
      },
      mapRegion: {
        latitude: 40.705,
        longitude: -74.0087,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      },
      loading: true,
      treeMarkers: [],
      selectedTree: "all"
    }
  this.fetchTreeData = this.fetchTreeData.bind(this)
  this.getCurrentLocation = this.getCurrentLocation.bind(this)
  this.goToInitialLocation = this.goToInitialLocation.bind(this)
  }

  async componentDidMount() {
    // this.fetchTreeData()
    await this.getCurrentLocation()
    // await this.fetchTreeData()
    // await console.log("INNITIAL REGION AFTER component did mount", this.state.initialRegion)

  }

  async getCurrentLocation() {
      let position = navigator.geolocation.getCurrentPosition(
        async (position)=> {
          let region = {
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            latitudeDelta: 5,
            longitudeDelta: 5
          }
          console.log("REGION", region)
          await this.setState({
            initialRegion: region,
            mapRegion: region
        })
        console.log('State after setState', this.state.initialRegion)
        await this.fetchTreeData()
        },
        (error) => {
          console.log(error)
        },
        {enableAcuracy: true, timeout: 2000, maximumAge: 1000}
      )
  }


  async fetchTreeData() {
    try {
      let encodedLocation = ''
      if (this.state.initialRegion.latitude) {
        encodedLocation = encodeURIComponent(`${this.state.initialRegion.latitude}, ${this.state.initialRegion.longitude}`)
      }
      else {
        encodedLocation = encodeURIComponent("40.7484, -73.9857")
      }
      console.log("ENCODED LOCATION", encodedLocation)
      const response = await fetch(`https://data.cityofnewyork.us/resource/5rq2-4hqu.json?zip_city=New%20York&$select=tree_id,%20spc_common,%20the_geom,%20spc_latin&$where=within_circle(the_geom,${encodedLocation},%201000)&$limit=20000`)
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

  goToInitialLocation() {
    let initialRegion = Object.assign({}, this.state.initialRegion)
    initialRegion["latitudeDelta"] = 0.005
    initialRegion["longitudeDelta"] = 0.005
    this.mapView.animateToRegion(initialRegion, 2000)
  }


  render() {
    console.log(this.state.treeMarkers.length)
    console.log(this.state.selectedTree)
    if (this.state.loading) {
      return (
        <Text>Loadig...</Text>
      )
    }


    return (
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={this.state.mapRegion}
        followsUserLocation={true}
        ref={ref => {this.mapView = ref}}
        zoomEnabled={true}
        showsUserLocation={true}
        onMapReady={this.goToInitialLocation.bind(this)}
        initialRegion={this.state.initialRegion}
      >
        {this.state.isloading ? null : this.state.treeMarkers.map((tree, index) => {
          const coordinates = {
            latitude: tree.the_geom.coordinates[1],
            longitude: tree.the_geom.coordinates[0]
          }
          const commonName = tree.spc_common
          const latinName = tree.spc_latin
          let pin = "green"
          commonName === this.state.selectedTree ? pin = 'orange' : pin = 'green'

          return (
            <Marker
              key = {index}
              coordinate = {coordinates}
              title = {commonName}
              description = {latinName}
              pinColor = {pin}
            >
            </Marker>
          )
        })
        }
      </MapView>
        <Picker
          selectedValue={this.state.selectedTree}
           style={{position: "absolute", bottom: 50, height: 50, width: 100}}
           itemStyle={{height:44}}
           onValueChange={(itemValue, itemIndex) => {
           this.setState({selectedTree: itemValue})
           this.goToInitialLocation()
          }
        }>
          <Picker.Item label="no highlight" value="all"/>
          <Picker.Item label="ginkgo" value="ginkgo"/>
          <Picker.Item label="honeylocust" value="honeylocust"/>
          <Picker.Item label="Japanese zelkova" value="Japanese zelkova"/>
        </Picker>
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
    justifyContent: 'flex-start',
  },
  mapStyle: {
    flex: 0.8,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }

});
