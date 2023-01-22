class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :business_name, :address, :phone_number, :website, :image_url, :likes, :google_coordinates, :user_id
  has_many :posts
end
