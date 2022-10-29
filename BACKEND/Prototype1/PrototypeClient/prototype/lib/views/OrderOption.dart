import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import '../constants.dart';
import 'package:http/http.dart' as http;

class OrderOption extends StatefulWidget {
  @override
  State<OrderOption> createState() => _OrderOptionState();
}

class _OrderOptionState extends State<OrderOption> {
  late int _selectedId = 0;
  late int totalPrice = 0;
  late int totalCount = 1;
  late int menuId;
  late String menuName;

  @override
  Widget build(BuildContext context) {
    var parameters = ModalRoute.of(context)!.settings.arguments as Map;
    menuId = parameters['id'];
    menuName = parameters['name'];
    totalCount = 1;
    
    return Scaffold(
      body: ListView(     
        scrollDirection: Axis.vertical,
        children: [
          SizedBox(width: MediaQuery.of(context).size.width,), // 넓이 꼼수
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
      margin: EdgeInsets.all(10),
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
            return ListView.builder(
              physics: const NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              scrollDirection: Axis.vertical,
              padding: const EdgeInsets.all(8),
              itemCount: snapshot.data.length,
              itemBuilder:  (BuildContext context, int index) {
                return _option(
                  snapshot.data[index].id, 
                  snapshot.data[index].name, 
                  snapshot.data[index].price
                );
              },
            );
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
            groupValue: _selectedId,
            onChanged: (value) {        
              setState(() {
                totalPrice = price;
                _selectedId = value as int;
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
  Widget _orderCompleteButton(){
    return BottomAppBar(      
      child: Container(
        margin: const EdgeInsets.all(10),
        height: 60,
        child: ElevatedButton(
          onPressed: () { 
            if(totalPrice == 0) return;
            Navigator.pushNamed(
              context,
              '/Order/Complete',
              arguments: {'optionMenuId': _selectedId },
            );
          },
          child: Text(
            "${totalPrice}원 주문하기",
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Colors.white,                        
            ),
          ),
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

