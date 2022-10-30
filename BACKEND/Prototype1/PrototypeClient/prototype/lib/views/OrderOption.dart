import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:get/get.dart';
import '../constants.dart';
import 'package:http/http.dart' as http;


class _RxController extends GetxController{
  RxInt _selectedId = 0.obs;
  RxInt _totalPrice = 0.obs;

  void changeId(int value){
    _selectedId.value = value;
  }
  void changeTotalPrice(int value){
    _totalPrice.value = value;
  }
}

class OrderOption extends GetView<_RxController>{ 
  late int totalCount = 1;
  late int menuId;
  late String menuName;

  @override
  Widget build(BuildContext context) {
    Get.put(_RxController()); 
    // var parameters = ModalRoute.of(context)!.settings.arguments as Map; // Original Way to Getting Flutter Router Arguments
    var parameters = Get.arguments;
    menuId = parameters['id'];
    menuName = parameters['name'];
    totalCount = 1;
    
    return Scaffold(
      body: ListView(     
        scrollDirection: Axis.vertical,
        children: [
          SizedBox(width: Get.width,), // 넓이 꼼수
          _menuImage(),
          _menuNameText(),
          const Divider(),
          _optionMenus(),
          const Divider(),
          //_menuCounter(),
        ]
      ),
      bottomNavigationBar: _orderCompleteButton(),
    );
  }

  Widget _menuImage(){
    return Container(
      margin: const EdgeInsets.all(10),
      child: ClipRRect(          
        borderRadius: BorderRadius.circular(8.0),
        child: Image.network(
          "${API}/image/${storeKey}/${menuId}",
      
          width: 200,
          height: 200,
        ),
      ),
    );
  }

  Widget _menuNameText(){
    return Container(
      margin: const EdgeInsets.fromLTRB(0, 0, 0, 20),
      child: Center(
        child: Text(
          menuName,
          style: const TextStyle(
            fontSize: 17,
            fontWeight: FontWeight.bold,
            color: Colors.black,                        
          ),
        ),
      ),
    );
  }

  Widget _optionMenus(){
    return FutureBuilder<List<_OptionMenu>>(
      future: _fetchOptionMenus(menuId),
      builder: (context, AsyncSnapshot snapshot) {
        if (snapshot.hasData) {
          return _OptionMenus(optionMenus : snapshot.data);            
        } else if (snapshot.hasError) {
          return Text("${snapshot.error}");
        }
        return const CircularProgressIndicator();
      }
    );
  }
  Widget _option(int id, String name, int price){
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: Obx( () {
                return RadioListTile(
                  title: Text(
                    name,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      color: Colors.black,                        
                    ),
                  ),        
                  value: id,
                  groupValue: controller._selectedId.value,
                  onChanged: (value) {        
                    controller.changeId(value!);
                    controller.changeTotalPrice(price);                 
                  }, 
              );
            }
          ),
        ),
        Container(
          margin: const EdgeInsets.fromLTRB(0, 0, 15, 0),
          child: Text(
            "${price} 원",
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              color: Colors.black,                        
            ),
          ),
        ),
      ],
    );
  }
  Widget _orderCompleteButton(){
    return BottomAppBar(      
      child: Container(
        margin: const EdgeInsets.all(10),
        height: 60,
        child: ElevatedButton(
          onPressed: () { 
            if(controller._totalPrice.value == 0) return;
            Get.toNamed(
              '/Order/Complete',
              arguments: {'optionMenuId': controller._selectedId.value }
            );
          },
          child: Obx(() {
            return Text(
              "${controller._totalPrice.value}원 주문하기",
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white,                        
              )
            );
          }),
        ),
      ),
    );
  }

  Widget _menuCounter(){
    var minusColor = Colors.grey;
    var plusColor = Colors.black;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [        
        Container(
          margin: const EdgeInsets.all(10),
          child: const Text(
            "수량",
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.black,                        
            ),
          ),
        ),
        const SizedBox(height: 30,), // 높이 꼼수
        Container(
          height: 50,
          margin: const EdgeInsets.all(10),
          decoration: BoxDecoration(        
            border: Border.all(
              color: Colors.grey,
              width: 1,
            ),
            borderRadius: BorderRadius.circular(30),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextButton(
                onPressed: () {}, 
                child: Text(
                  "-",
                  style: const TextStyle(
                    fontSize: 30,
                    color: Colors.grey,                        
                  ),
                ),
              ),
              Text(
                "${totalCount}개",
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,                        
                ),
              ),
              TextButton(
                onPressed: () {}, 
                child: Text(
                  "+",
                  style: const TextStyle(
                    fontSize: 30,

                    color: Colors.black,                        
                  ),
                ),
              ),
            ],
          ),
        )
      ],
    );
  }

  Future< List<_OptionMenu> > _fetchOptionMenus(int menuId) async {
    var resp = await http.get( Uri.parse("${API}/store/optionMenus/${menuId}") );
    var respList = json.decode(resp.body)['optionMenus'];
    List<_OptionMenu> optionMenus = <_OptionMenu>[];
    for (var e in respList) {
      optionMenus.add( _OptionMenu( id: e['id'], name: e['name'], price: e['price'] ) );
    }
    return optionMenus;
  }
}

class _OptionMenu{
  final int id;
  final String name;
  final int price;
  
  _OptionMenu({required this.id,required this.name,required this.price});
}

class _OptionMenus extends StatefulWidget {
  final List<_OptionMenu> optionMenus;
  late int _selectedId = 0;
  late int totalPrice = 0;

  _OptionMenus({super.key, required this.optionMenus});

  @override
  State<_OptionMenus> createState() => __OptionMenusState();
}

class __OptionMenusState extends State<_OptionMenus> {
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      scrollDirection: Axis.vertical,
      padding: const EdgeInsets.all(8),
      itemCount: widget.optionMenus.length,
      itemBuilder:  (BuildContext context, int index) {
        return _option(
          widget.optionMenus[index].id, 
          widget.optionMenus[index].name, 
          widget.optionMenus[index].price
        );
      },
    );
  }
  Widget _option(int id, String name, int price){
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: RadioListTile(
            title: Text(
              name,
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.bold,
                color: Colors.black,                        
              ),
            ),        
            value: id,
            groupValue: widget._selectedId,
            onChanged: (value) {        
              setState(() {
                widget.totalPrice = price;
                widget._selectedId = value as int;
              });                        
            }, 
          ),
        ),
        Container(
          margin: const EdgeInsets.fromLTRB(0, 0, 15, 0),
          child: Text(
            "${price} 원",
            style: const TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              color: Colors.black,                        
            ),
          ),
        ),
      ],
    );
  }
}