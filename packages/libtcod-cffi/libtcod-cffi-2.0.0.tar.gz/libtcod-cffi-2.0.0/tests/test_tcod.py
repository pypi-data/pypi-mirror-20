#!/usr/bin/env python

import sys

import copy
import pickle

import numpy as np
import pytest

from common import tcod, raise_Exception
import tcod.noise
import tcod.path

def test_line_error():
    """
    test exception propagation
    """
    with pytest.raises(Exception):
        tcod.line(*LINE_ARGS, py_callback=raise_Exception)

@pytest.mark.skip(reason="Clipboard functions are up in the air")
def test_clipboard_set():
    tcod.clipboard_set('')

@pytest.mark.skip(reason="Clipboard functions are up in the air")
@pytest.mark.skipif(sys.platform == 'darwin',
                    reason="Known crash on Mac OS/X")
def test_clipboard_get():
    tcod.clipboard_get()


def test_tcod_bsp():
    """
    test tcod additions to BSP
    """
    bsp = tcod.bsp.BSP(0, 0, 32, 32)

    assert bsp.level == 0
    assert not bsp.horizontal
    assert not bsp.children

    with pytest.raises(Exception):
        tcod.bsp_traverse_pre_order(bsp, raise_Exception)

    bsp.split_recursive(3, 4, 4, 1, 1)
    for node in bsp.walk():
        assert isinstance(node, tcod.bsp.BSP)

    assert bsp != 'asd'

    # test that operations on deep BSP nodes preserve depth
    sub_bsp = bsp.children[0]
    sub_bsp.split_recursive(3, 2, 2, 1, 1)
    assert sub_bsp.children[0].level == 2


def test_array_read_write(console):
    FG = (255, 254, 253)
    BG = (1, 2, 3)
    CH = ord('&')
    tcod.console_put_char_ex(console, 0, 0, CH, FG, BG)
    assert console.ch[0, 0] == CH
    assert tuple(console.fg[0, 0]) == FG
    assert tuple(console.bg[0, 0]) == BG

    tcod.console_put_char_ex(console, 1, 2, CH, FG, BG)
    assert console.ch[2, 1] == CH
    assert tuple(console.fg[2, 1]) == FG
    assert tuple(console.bg[2, 1]) == BG

    console.clear()
    assert console.ch[1, 1] == ord(' ')
    assert tuple(console.fg[1, 1]) == (255, 255, 255)
    assert tuple(console.bg[1, 1]) == (0, 0, 0)

    ch_slice = console.ch[1, :]
    ch_slice[2] = CH
    console.fg[1, ::2] = FG
    console.bg[...] = BG

    assert tcod.console_get_char(console, 2, 1) == CH
    assert tuple(tcod.console_get_char_foreground(console, 2, 1)) == FG
    assert tuple(tcod.console_get_char_background(console, 2, 1)) == BG


def test_console_defaults(console):
    console.default_bg = [2, 3, 4]
    assert console.default_bg == (2, 3, 4)

    console.default_fg = (4, 5, 6)
    assert console.default_fg == (4, 5, 6)

    console.default_bg_blend = tcod.BKGND_ADD
    assert console.default_bg_blend == tcod.BKGND_ADD

    console.default_alignment = tcod.RIGHT
    assert console.default_alignment == tcod.RIGHT

def test_console_methods(console):
    console.put_char(0, 0, ord('@'))
    console.print_(0, 0, 'Test')
    console.print_rect(0, 0, 2, 8, 'a b c d e f')
    console.get_height_rect(0, 0, 2, 8, 'a b c d e f')
    console.rect(0, 0, 2, 2, True)
    console.hline(0, 1, 10)
    console.vline(1, 0, 10)
    console.print_frame(0, 0, 8, 8, 'Frame')
    console.blit(0, 0, 0, 0, console, 0, 0)
    console.set_key_color((254, 0, 254))

def test_tcod_map_set_bits(benchmark):
    map_ = tcod.map.Map(2,2)

    assert map_.transparent[:].any() == False
    assert map_.walkable[:].any() == False
    assert map_.fov[:].any() == False

    map_.transparent[1, 0] = True
    assert tcod.map_is_transparent(map_, 0, 1) == True
    map_.walkable[1, 0] = True
    assert tcod.map_is_walkable(map_, 0, 1) == True
    map_.fov[1, 0] = True
    assert tcod.map_is_in_fov(map_, 0, 1) == True

    benchmark(map_.transparent.__setitem__, 0, 0)


def test_tcod_map_get_bits(benchmark):
    map_ = tcod.map.Map(2,2)
    benchmark(map_.transparent.__getitem__, 0)

def test_tcod_map_copy(benchmark):
    map_ = tcod.map.Map(3, 3)
    map_.transparent[:] = True
    assert (map_.buffer[:].tolist() == copy.copy(map_).buffer[:].tolist())
    benchmark(copy.copy, map_)

def test_tcod_map_pickle():
    map_ = tcod.map.Map(3, 3)
    map_.transparent[:] = True
    assert (map_.buffer[:].tolist() ==
            pickle.loads(pickle.dumps(copy.copy(map_))).buffer[:].tolist())

def test_noise_class():
    noise = tcod.noise.Noise(2)
    # cover attributes
    assert noise.dimentions == 2
    noise.algorithm = noise.algorithm
    noise.hurst
    noise.lacunarity

    # cover implementations
    for implementation in [tcod.noise.SIMPLE,
                           tcod.noise.FBM,
                           tcod.noise.TURBULENCE]:
        noise.implementation = implementation
        noise.get_point(0, 0)

    # cover exception
    noise.implementation = -1
    with pytest.raises(RuntimeError):
        noise.get_point(0, 0)

def test_color_class():
    assert tcod.black == tcod.black
    assert tcod.black == (0, 0, 0)
    assert tcod.black == [0, 0, 0]
    assert tcod.black != tcod.white
    assert tcod.white * 1 == tcod.white
    assert tcod.white * tcod.black == tcod.black
    assert tcod.white - tcod.white == tcod.black
    assert tcod.black + (2, 2, 2) - (1, 1, 1) == (1, 1, 1)
    assert not tcod.black == None

    color = tcod.Color()
    color.r = 1
    color.g = 2
    color.b = 3
    assert color == (1, 2, 3)

@pytest.mark.parametrize('dtype', [np.int8, np.int16, np.int32,
                                   np.uint8, np.uint16, np.uint32, np.float32])
def test_path_numpy(dtype):
    map_np = np.ones((6, 6), dtype=dtype)
    map_np[1:4, 1:4] = 0

    astar = tcod.path.AStar(map_np, 0)
    assert len(astar.get_path(0, 0, 5, 5)) == 10

    dijkstra = tcod.path.Dijkstra(map_np, 0)
    dijkstra.set_goal(0, 0)
    assert len(dijkstra.get_path(5, 5)) == 10

def test_path_callback():
    def path_cost(this_x, this_y, dest_x, dest_y):
        return 1
    astar = tcod.path.AStar(path_cost, width=10, height=10)
    assert len(astar.get_path(0, 0, 9, 9)) == 9
