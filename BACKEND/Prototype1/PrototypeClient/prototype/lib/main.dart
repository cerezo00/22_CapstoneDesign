import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import './constants.dart';
import './views/_library.dart';
import 'dart:html' as html;

void main() {
  //storeKey = '1'; // debug mode
  storeKey = Uri.base.path.replaceAll('/','');

  runApp(MaterialApp(
      title: 'Demo',
      debugShowCheckedModeBanner: false,

      initialRoute: '/',
      routes: {
        '/': (context) => Home(),
        '/Order':(context) => Order(),
        '/Order/Option': (context) => OrderOption(),
        '/Order/Complete':(context) => OrderComplete(),
      },
  ));
}

class Home extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        
        children: [
          Container(
            margin: const EdgeInsets.all(10),
            width: 160,
            height: 100,
            child: ElevatedButton(            
              onPressed: () {
                Navigator.pushNamed(context, "/Order");
              },
              child: const Text(
                "주문하기",
                style: const TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,                    
                ),
              ),
            ),
          ),
          Container(
            margin: const EdgeInsets.all(10),
            width: 160,
            height: 100,
            child: ElevatedButton(                          
              onPressed: () {      
                Share.share(html.window.location.href);        
              },
              child: const Text(
                "공유하기",
                style: const TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,                      
                ),
              ),
            ),
          ),        
        ],
      ),
    );
  }
}