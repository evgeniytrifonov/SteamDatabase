if( document.getElementById( 'inventory_link_753' ) )
{
	var element = document.createElement( 'script' );
	element.id = 'steamdb_inventory_hook';
	element.type = 'text/javascript';
	element.src = GetLocalResource( 'scripts/community/inventory.js' );
	element.dataset.homepage = GetHomepage();
	
	document.head.appendChild( element );
}
