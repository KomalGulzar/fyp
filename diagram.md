classDiagram

class User {
  string _id
  string username
  string email
  string password
  string avatar
  string role
  string description
  boolean verified
  array wishlist
  datetime createdAt
  datetime updatedAt
  string userlastname
  int __v
}

class Category {
  string _id
  string name
  string image
  datetime createdAt
  datetime updatedAt
  int __v
}

class Listing {
  string _id
  string p_name
  string p_desc
  string p_category
  float p_price
  array p_imgs
  int p_com_id
  string p_sdesc
  int p_order
  int p_trade
  string userRef
  datetime createdAt
  datetime updatedAt
  int __v
  string sellerEmail
  string sellerUsername
}

class Message {
  string _id
  string name
  string email
  string subject
  string message
  datetime createdAt
  datetime updatedAt
  int __v
}

%% Relationships
Listing --> User : userRef
Listing --> Category : p_category
