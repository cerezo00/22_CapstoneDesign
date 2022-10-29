import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:http/http.dart' as http;
import '../constants.dart';


class Order extends StatefulWidget {
  @override
  State<Order> createState() => _OrderState();
}

class _OrderState extends State<Order> {
  Widget bottomShoppingCartBar = const SizedBox.shrink();

  @override
  initState() {
    super.initState();

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: _storelogo(),
        leadingWidth: 80,
        title: _storeName(),
        centerTitle: true,
        toolbarHeight: 80,
        backgroundColor: Colors.white,
        elevation: 1,
        actions: [
          IconButton(
            padding: const EdgeInsets.fromLTRB(0, 0, 10, 0),
            onPressed: (){},
            icon: const Icon(
              Icons.shopping_cart,
              color: Colors.black,
            )
          )
        ],
        
      ),

      body: _categories(),

      bottomNavigationBar: bottomShoppingCartBar,
    );  
  }

  Widget _storelogo(){
    return Container(
      margin: const EdgeInsets.all(3),
      child: Image.network(
        "${API}/image/${storeKey}/logo",
        fit: BoxFit.fill,
      ),
    );
  }
  Widget _storeName(){
    return FutureBuilder<String>(
      future: _fetchStoreName(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Text(
            snapshot.data.toString(),
            style: const TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.bold,
              fontSize: 25,
            ),
          );
        } else if (snapshot.hasError) {
          return Text("${snapshot.error}");
        }
        // 기본적으로 로딩 Spinner를 보여줍니다.
        return const CircularProgressIndicator();
      }
    );
  }

  Widget _categories(){
    return FutureBuilder<List<_Category>>(
      future: _fetchCategories(),
      builder: (context, AsyncSnapshot snapshot) {
        if (snapshot.hasData) {
            return ListView.builder(
              scrollDirection: Axis.vertical,
              padding: const EdgeInsets.all(8),
              itemCount: snapshot.data.length,
              itemBuilder:  (BuildContext context, int index) {
                return _category(snapshot.data[index].id, snapshot.data[index].name);
              },
            );
        } else if (snapshot.hasError) {
          return Text("${snapshot.error}");
        }
        return const CircularProgressIndicator();
      }
    );
  }

  Widget _category(int id, String name){
    return Container(
      margin: EdgeInsets.fromLTRB(0, 5, 0, 5),
      decoration: BoxDecoration(        
        border: Border.all(
          color: Colors.grey,
          width: 2,
        ),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          Text(
            name,
            style: const TextStyle(
              fontSize: 17,
              fontWeight: FontWeight.bold,              
            ),
          ),
          FutureBuilder<List<_Menu>>(
            future: _fetchMenus(id),
            builder: (context, AsyncSnapshot snapshot) {
              if (snapshot.hasData) {
                  return ListView.separated(
                    physics: const NeverScrollableScrollPhysics(),                    
                    shrinkWrap: true,
                    padding: const EdgeInsets.all(4),
                    itemCount: snapshot.data.length,
                    itemBuilder:  (BuildContext context, int index) {
                      return _menu(
                        snapshot.data[index].id, 
                        snapshot.data[index].name, 
                        snapshot.data[index].description
                      );
                    }, 
                    separatorBuilder: (BuildContext context, int index) { 
                      return const Divider(
                        color: Colors.grey,
                        thickness: 1.0,
                      );
                    },
                  );
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }
              return const CircularProgressIndicator();
            }
          ),
        ],
      ),
    );
  }

  Widget _menu(int menuId, String menuName, String description) {
    const double _thisheight = 100;

    return Container(
      margin: const EdgeInsets.fromLTRB(0, 2, 0, 2),
      
      child: InkWell(      
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              height: _thisheight,
              child: Column(            
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: EdgeInsets.fromLTRB(0,2,0, 10),
                    child: Text(
                      menuName,
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width * 0.7,
                    child: Text(
                      description,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(

                      ),
                    ),
                  ),
                ],
              ),
            ), 
            ClipRRect(
              borderRadius: BorderRadius.circular(8.0),
              child: Image.network(
                "${API}/image/${storeKey}/${menuId}",

                width: 100,
                height: _thisheight,
              ),
            ),                                     
          ],
        ),
        onTap: () {
          Navigator.pushNamed(
            context,
            '/Order/Option',
            arguments: {'id': menuId, 'name': menuName},
          );
        },
      ),
    );
  }

  void _bottomShoppingCartBarToggle(){
    setState(() {
      bottomShoppingCartBar == null ?
      bottomShoppingCartBar = BottomAppBar(
        child: Text("bottom!!"),
      )
      :
      bottomShoppingCartBar = const SizedBox.shrink();
    });
  }

  Future<String> _fetchStoreName() async {
    var resp = await http.get( Uri.parse("${API}/store/name/${storeKey}") );
    String storeName = await jsonDecode(resp.body)['name'];
    return storeName;
  }
  Future< List<_Category> > _fetchCategories() async {
    var resp = await http.get( Uri.parse("${API}/store/categories/${storeKey}") );
    var respList = json.decode(resp.body)['categories'];
    List<_Category> categories = <_Category>[];
    for (var e in respList) {
      categories.add( _Category( id: e['id'], name: e['name'] ) );
    }
    return categories;
  }
  Future< List<_Menu> > _fetchMenus(int categoryId) async {
    var resp = await http.get( Uri.parse("${API}/store/menus/${categoryId}") );
    var respList = json.decode(resp.body)['menus'];
    List<_Menu> menus = <_Menu>[];
    for (var e in respList) {
      menus.add( _Menu( id: e['id'], name: e['name'], description: e['description'] ) );
    }
    return menus;
  }

}

class _Category{
  final num id;
  final String name;
  
  _Category({required this.id,required this.name});
}
class _Menu{
  final num id;
  final String name;
  final String description;
  
  _Menu({required this.id,required this.name,required this.description});
}
