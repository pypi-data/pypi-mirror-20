from oem_format_minimize.core.minimize import MinimizeProtocol, MinimizeProperty
from oem_format_minimize.protocol.name import NameMinimizeProtocol
from oem_format_minimize.protocol.part import PartMinimizeProtocol


class MovieMinimizeProtocol(MinimizeProtocol):
    __root__    = True
    __version__ = 0x01

    identifiers     = 0x01
    names           = 0x02

    supplemental    = 0x11
    parameters      = 0x12

    parts           = 0x21

    NameMinimizeProtocol = NameMinimizeProtocol.to_child(
        key='names',
        process={
            'children': True
        }
    )

    PartMinimizeProtocol = PartMinimizeProtocol.to_child(
        key='parts',
        process={
            'children': True
        }
    )

    class IdentifiersMinimizeProtocol(MinimizeProtocol):
        __key__ = 'identifiers'

        anidb           = 0x01
        imdb            = 0x02
        tvdb            = 0x03
        tmdb_movie      = MinimizeProperty('tmdb:movie', 0x04)
        tmdb_show       = MinimizeProperty('tmdb:show',  0x05)

    class SupplementalMinimizeProtocol(MinimizeProtocol):
        __key__ = 'supplemental'

        studio          = 0x01

    class ParametersMinimizeProtocol(MinimizeProtocol):
        __key__ = 'parameters'

        default_season  = 0x01
        episode_offset  = 0x02
