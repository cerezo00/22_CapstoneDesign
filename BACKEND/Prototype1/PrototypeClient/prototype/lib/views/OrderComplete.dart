import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:qr_flutter/qr_flutter.dart';


import '../constants.dart';

class OrderComplete extends StatelessWidget {
  late int optionMenuId;

  @override
  Widget build(BuildContext context) {
    var parameters = ModalRoute.of(context)!.settings.arguments as Map;
    optionMenuId = parameters['optionMenuId'];


    return Scaffold(
      body: Center(
        child: Column(
          children: [
            Container(
              margin: const EdgeInsets.all(30),
              child: QrImage(
                data: "${API}/payment/${optionMenuId}",
                backgroundColor: Colors.white,
                size: 200,
              ),
            ),
            Container(
              margin: const EdgeInsets.all(30),
              child: Text(
                "무인단말기의 카메라에 QR코드를 보여주세요.",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,                        
                ),
              ),
            ),          
          ],
        )
      ),
    );
  }
}