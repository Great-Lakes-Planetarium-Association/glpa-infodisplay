(function () {
	'use strict';

	const tweets = nodecg.Replicant('tweets');

	class TwitterControls extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'twitter-controls';
		}

		static get properties() {
			return {};
		}

		ready() {
			super.ready();

			tweets.on('change', newVal => {
				this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
				this.tweets = newVal;
			});
		}

		_sortTweets(a, b) {
			return new Date(b.created_at) - new Date(a.created_at);
		}
	}

	customElements.define(TwitterControls.is, TwitterControls);
})();
