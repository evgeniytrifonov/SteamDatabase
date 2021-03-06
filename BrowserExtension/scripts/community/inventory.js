(function()
{
	var i,
	    link,
	    homepage = document.getElementById( 'steamdb_inventory_hook' ).dataset.homepage,
	    originalPopulateActions = window.PopulateActions;
	
	window.PopulateActions = function( elActions, rgActions, item )
	{
		var foundState = 0;
		
		try
		{
			if( item.appid == 753 )
			{
				if( rgActions )
				{
					for( i = 0; i < rgActions.length; i++ )
					{
						link = rgActions[ i ];
						
						if( link.steamdb )
						{
							foundState = 2;
							break;
						}
						else if( link.link && link.link.match( /\.com\/(app|sub)\// ) )
						{
							foundState = 1;
						}
					}
					
					if( foundState === 1 )
					{
						for( i = 0; i < rgActions.length; i++ )
						{
							link = rgActions[ i ].link;
							
							if( !link )
							{
								continue;
							}
							
							link = link.match( /\.com\/(app|sub)\/([0-9]{1,6})/ );
							
							if( link )
							{
								rgActions.push( {
									steamdb: true,
									link: homepage + link[ 1 ] + '/' + link[ 2 ] + '/',
									name: 'View on Steam Database'
								} );
								
								foundState = 2;
								
								break;
							}
						}
					}
				}
				else if( !item.actions && item.type === 'Gift' ) // This function gets called with owner_actions too
				{
					item.actions = rgActions = [ {
						steamdb: true,
						link: homepage + 'search/?a=sub&q=' + encodeURIComponent( item.name ),
						name: 'Search on Steam Database'
					} ];
					
					foundState = 2;
				}
				
				if( item.tags )
				{
					for( i = 0; i < item.tags.length; i++ )
					{
						link = item.tags[ i ];
						
						if( ( link.internal_name === 'cardborder_1' || link.internal_name === 'droprate_1' || link.internal_name === 'droprate_2' ) && link.name.substring( 0, 5 ) !== '<span' )
						{
							item.tags[ i ].name = '<span style="color:#f39c12">' + link.name + '</span>';
						}
					}
				}
			}
		}
		catch( e )
		{
			// Don't break website functionality if something fails above
			console.error( e );
		}
		
		originalPopulateActions( elActions, rgActions, item );
		
		// We want our links to be open in new tab
		if( foundState === 2 )
		{
			link = elActions.querySelector( '.item_action[href^="' + homepage + '"]' );
			
			if( link )
			{
				link.target = '_blank';
			}
		}
	};
}());
