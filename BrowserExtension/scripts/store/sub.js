var container = document.querySelector( '.share' );

if( container )
{
	var link = document.createElement( 'a' );
	link.className = 'game_area_wishlist_btn steamdb_button';
	link.target = '_blank';
	link.href = GetHomepage() + 'sub/' + GetCurrentAppID() + '/';
	link.appendChild( document.createTextNode( 'View on Steam Database' ) );
	
	var element = document.createElement( 'div' );
	element.className = 'demo_area_button';
	element.appendChild( link );
	
	container.insertBefore( element, container.firstChild );
}
