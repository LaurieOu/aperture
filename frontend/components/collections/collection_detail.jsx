var React = require('react');
var CollectionStore = require('../../stores/collection_store');
var CollectionActions = require('../../actions/collection_actions');
var Masonry = require('react-masonry-component');
var PhotoIndexItem = require('../photos/photos_index_item');
var PhotoActions = require('../../actions/photo_actions');
var ModalActions = require('../../actions/modal_actions');

var masonryOptions = {
	transitionDuration: 0,
	itemSelector: ".grid-item"
};

var CollectionDetail = React.createClass({

	getInitialState: function(){
		return {
			collection: ""
		}
	},

	componentDidMount: function(){
		this.toke = CollectionStore.addListener(this._onChange);
		CollectionActions.fetchCollection(parseInt(this.props.params.id));
	},

	componentWillUnmount: function(){
		this.toke.remove();
	},

	_onChange: function(){
		var col = CollectionStore.collection()
		this.setState({collection: col})
	},

	handleUserClick: function(){
		this.props.history.push("/users/" + this.state.collection.user_id);
	},

	generatePhotoItems: function(){
		if (this.state.collection){

			var cName = "grid-item"

			return this.state.collection.photos.map(function(photo, ind){
				return <PhotoIndexItem
									key={ind}
									photo={photo}
									cName={cName}
									photos={this.state.collection.photos}/>
			}.bind(this));
		}
	},

	handleBackgroundImage: function(){
		if (this.state.collection){
			if (this.state.collection.photos.length > 0){
				return this.state.collection.photos[0].url
			} else {
				return this.state.collection.cover_photo
			}
		}
	},


	render: function() {
		var title;
		var username;
		if (this.state.collection){
			title = this.state.collection.title;
			username = "by " + this.state.collection.user_name;
		}

		return (
			<div className="parallax">

				<div className="parallax__layer parallax__layer--back background">
					{this.state.collection ? (<img src={this.handleBackgroundImage()}/>) : (<div className="loader">Loading...</div>)}
				</div>

				<div className="parallax__layer parallax__layer--base group">
					<div className="collection-container">

						<section className="collection-header">
							<h3 className="styled-header"> {title} 
								<span className="header-detail" onClick={this.handleUserClick}> {username} </span> 
							</h3>
						</section>

						<section className="collection-body">


							<Masonry
								className={'grid'}
								elementType={'div'}
								options={masonryOptions}
								disableImagesLoaded={false}>

								{this.generatePhotoItems()}

							</Masonry>
						</section>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = CollectionDetail;