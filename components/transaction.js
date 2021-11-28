import * as React from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid

} from 'react-native';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from "firebase"

import database from "../config"

export default class Trans extends React.Component {
  constructor() {
    super();
    this.state = {
      cameraPER: null,
      datascn: false,
      bookscnd: '',
      studentscnd: '',
      butstate: 'vac',
    };
  }

  accuirecamper = async (use) => {
    const status = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      cameraPER: status == 'Granted',
      butstate: use,
      datascn: false,
    });
  };

  barscn = async ({ type, data }) => {
    if (this.state.butstate == "BookID") {
      this.setState({
        datascn: true,
        bookscnd: data,
        butstate: 'vac',
      });
    }
    else if (this.state.butstate == "StudentID") {
      this.setState({
        datascn: true,
        studentscnd: data,
        butstate: 'vac',
      });
    }
  };

  handletransition = async () => {
    database.collection("Books").doc(this.state.bookscnd).get()
      .then(doc => {
        var DetailBK = doc.data()
        if(DetailBK.AviBook){
          this.BKissue()
        }
        else{
          this.BKreturn()
        }
      })
  }

  BKissue = async () => {
    database.collection("Transac").add({
      "BookID": this.state.bookscnd,
      "StudentID": this.state.studentscnd,
      "Date" : firebase.firestore.Timestamp.now().toDate(),
      "transactionType" : "Issue"
    })
    database.collection("Books").doc(this.state.bookscnd).update({
      "AviBook": false, 
      
    })
    database.collection("Students").doc(this.state.studentscnd).update({
      "Issued" : firebase.firestore.FieldValue.increment(+1)
    })
    ToastAndroid.show ('The book had been issued by the student', ToastAndroid.SHORT)
  }

  BKreturn = async () => {
    database.collection("Transac").add({
      "BookID": this.state.bookscnd,
      "StudentID": this.state.studentscnd,
      "Date" : firebase.firestore.Timestamp.now().toDate(),
      "transactionType" : "Return"
    })
    database.collection("Books").doc(this.state.bookscnd).update({
      "AviBook": true, 
      
    })
    database.collection("Students").doc(this.state.studentscnd).update({
      "Issued" : firebase.firestore.FieldValue.increment(-1)
    })
    ToastAndroid.show ('The book had been returned by the student', ToastAndroid.SHORT)
  }

  render() {
    if (this.state.butstate != "vac" && this.state.cameraPER) {
      return (
        <BarCodeScanner
          onBarCodeScanned={datascn ? 'Done' : this.barscn}></BarCodeScanner>
      );
    } else if (this.state.butstate == 'vac') {
      return (
        <KeyboardAvoidingView style={{ alignContent: "center" }} behavior="padding" >
          <View>
            <Image
              style={{ height: 300, width: 300 }}
              source={require('../logo.png')}></Image>
          </View>
          <View>
            <TextInput
              style={{ width: 200, height: 40, borderWidth: 1.5, fontSize: 20 }}
              placeholder="Book ID" value={this.state.bookscnd} onChangeText= {Book1 => this.setState({bookscnd:Book1})}>
            </TextInput>
            <TouchableOpacity style={styles.button}
              onPress={() => { this.accuirecamper("BookID") }}>
              <Text>enter</Text>
            </TouchableOpacity>
          </View><View>
            <TextInput
              style={{ width: 200, height: 40, borderWidth: 1.5, fontSize: 20 }}
              placeholder="Book ID" value={this.state.studentscnd} onChangeText= {student1 => this.setState({studentscnd:student1})}>
            </TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.accuirecamper("StudentID") }}>
              <Text>enter</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => { this.handletransition() }}>
            <Text>GO</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0
  },
});
