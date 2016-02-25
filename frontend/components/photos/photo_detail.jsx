var React = require('react');
var PhotoStore = require('../../stores/photo_store');
var PhotoEditForm = require('./photo_edit_form');
var ApiUtil = require('../../util/api_util');

var PhotoDetail = React.createClass({

	getInitialState: function(){
		return{
			photo: PhotoStore.find_by_id(parseInt(this.props.params.id))
		};
	},

	componentDidMount: function(){
		this.toke = PhotoStore.addListener(this._onChange);
	},

	_onChange: function(){
		this.setState({photo: PhotoStore.find_by_id(parseInt(this.props.params.id))})
	},

	componentWillUnmount: function(){
		this.toke.remove();
	},

	_photoPresenceCheck: function(){
		if (this.state.photo){
			this.havePhoto = true;
		} else {
			this.havePhoto = false;
			ApiUtil.fetchAllPhotos();
		}
	},

	render: function() {

		var check = <PhotoEditForm photo={this.state.photo}/>


		this._photoPresenceCheck()

		if (this.havePhoto){
			return (
				<div className="photo-detail-cotainer group">

					<section className="photo-detail">
						<img src={this.state.photo.url}/>
					</section>

					<section className="photo-info">
						<p>Title: {this.state.photo.title}</p>
						<p>Price: {this.state.photo.price}</p>
					</section>


				</div>
			);
		} else {
			return (<div className="loader">Just a minute...</div>);
		}
	}
});

module.exports = PhotoDetail;