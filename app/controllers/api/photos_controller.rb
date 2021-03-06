class Api::PhotosController < ApplicationController

  def index

    if params[:tag]
      #.page(params[:page])
      @photos = Photo.includes(:comments, :user, :tags).where("tags.title" => params[:tag]).all.order(id: :desc)
    else
      @photos = Photo.includes(:tags, :user, comments: :user).all.order(id: :desc)
    end

    render :index

  end

  def show
    @photo = Photo.includes(:tags, comments: :user).find(params[:id])
    render :show
  end

  def create

    @photo = Photo.new()
    
    @photo.url = photo_params[:url]
    @photo.title = photo_params[:title]
    @photo.description = photo_params[:description]

    @photo.user = current_user
    @photo.save!

    if params[:photo][:tags]
      tag_ids = Tag.find_ids(params[:photo][:tags])
      @photo.tag_ids = tag_ids
    end

    render :show
  end

  def update
    @photo = Photo.find(params[:id])
    @photo.update!(photo_params)


    if params[:photo][:tags]
      tag_ids = Tag.find_ids(params[:photo][:tags])
      @photo.tag_ids = tag_ids
    end

    render :show
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy!
    render :show
  end

  private

  def photo_params
    params.require(:photo).permit(:url, :title, :description, :tags)
  end

end
