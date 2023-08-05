Plot Style
==========

..  contents::
    :local:
    :depth: 2


Scatter Plots
-------------

.. py:currentmodule:: tecplot.plot

Scatter
^^^^^^^

.. autoclass:: Scatter

    **Attributes**

    .. autosummary::
        :nosignatures:

        variable
        variable_index

.. autoattribute:: Scatter.variable
.. autoattribute:: Scatter.variable_index

Vector Plots
------------

..  contents::
    :local:
    :depth: 1

.. py:currentmodule:: tecplot.plot

Vector2D
^^^^^^^^

.. autoclass:: Vector2D

    **Attributes**

    .. autosummary::
        :nosignatures:

        u_variable
        u_variable_index
        v_variable
        v_variable_index

.. autoattribute:: Vector2D.u_variable
.. autoattribute:: Vector2D.u_variable_index
.. autoattribute:: Vector2D.v_variable
.. autoattribute:: Vector2D.v_variable_index

.. py:currentmodule:: tecplot.plot

Vector3D
^^^^^^^^

.. autoclass:: Vector3D

    **Attributes**

    .. autosummary::
        :nosignatures:

        u_variable
        u_variable_index
        v_variable
        v_variable_index
        w_variable
        w_variable_index

.. autoattribute:: Vector3D.u_variable
.. autoattribute:: Vector3D.u_variable_index
.. autoattribute:: Vector3D.v_variable
.. autoattribute:: Vector3D.v_variable_index
.. autoattribute:: Vector3D.w_variable
.. autoattribute:: Vector3D.w_variable_index

Contours
--------

..  contents::
    :local:
    :depth: 1

.. py:currentmodule:: tecplot.plot

ContourGroup
^^^^^^^^^^^^

.. autoclass:: ContourGroup

    **Attributes**

    .. autosummary::
        :nosignatures:

        color_cutoff
        colormap_filter
        colormap_name
        default_num_levels
        labels
        legend
        levels
        lines
        variable
        variable_index

.. autoattribute:: ContourGroup.color_cutoff
.. autoattribute:: ContourGroup.colormap_filter
.. autoattribute:: ContourGroup.colormap_name
.. autoattribute:: ContourGroup.default_num_levels
.. autoattribute:: ContourGroup.labels
.. autoattribute:: ContourGroup.legend
.. autoattribute:: ContourGroup.levels
.. autoattribute:: ContourGroup.lines
.. autoattribute:: ContourGroup.variable
.. autoattribute:: ContourGroup.variable_index

.. py:currentmodule:: tecplot.plot

ContourColorCutoff
^^^^^^^^^^^^^^^^^^

.. autoclass:: ContourColorCutoff

    **Attributes**

    .. autosummary::
        :nosignatures:

        include_max
        include_min
        inverted
        max
        min

.. autoattribute:: ContourColorCutoff.include_max
.. autoattribute:: ContourColorCutoff.include_min
.. autoattribute:: ContourColorCutoff.inverted
.. autoattribute:: ContourColorCutoff.max
.. autoattribute:: ContourColorCutoff.min

.. py:currentmodule:: tecplot.plot

ContourColormapFilter
^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: ContourColormapFilter

    **Attributes**

    .. autosummary::
        :nosignatures:

        continuous_max
        continuous_min
        distribution
        fast_continuous_flood
        num_cycles
        reversed
        show_overrides
        zebra_shade

    **Methods**

    .. autosummary::

        override

.. autoattribute:: ContourColormapFilter.continuous_max
.. autoattribute:: ContourColormapFilter.continuous_min
.. autoattribute:: ContourColormapFilter.distribution
.. autoattribute:: ContourColormapFilter.fast_continuous_flood
.. autoattribute:: ContourColormapFilter.num_cycles
.. automethod:: ContourColormapFilter.override
.. autoattribute:: ContourColormapFilter.reversed
.. autoattribute:: ContourColormapFilter.show_overrides
.. autoattribute:: ContourColormapFilter.zebra_shade

.. py:currentmodule:: tecplot.plot

ContourColormapOverride
^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: ContourColormapOverride

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        end_level
        show
        start_level

.. autoattribute:: ContourColormapOverride.color
.. autoattribute:: ContourColormapOverride.end_level
.. autoattribute:: ContourColormapOverride.show
.. autoattribute:: ContourColormapOverride.start_level

.. py:currentmodule:: tecplot.plot

ContourColormapZebraShade
^^^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: ContourColormapZebraShade

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        show
        transparent

.. autoattribute:: ContourColormapZebraShade.color
.. autoattribute:: ContourColormapZebraShade.show
.. autoattribute:: ContourColormapZebraShade.transparent

.. py:currentmodule:: tecplot.plot

ContourLabels
^^^^^^^^^^^^^

.. autoclass:: ContourLabels

    **Attributes**

    .. autosummary::
        :nosignatures:

        auto_align
        auto_generate
        background_color
        color
        filled
        font
        label_by_level
        margin
        show
        spacing
        step

.. autoattribute:: ContourLabels.auto_align
.. autoattribute:: ContourLabels.auto_generate
.. autoattribute:: ContourLabels.background_color
.. autoattribute:: ContourLabels.color
.. autoattribute:: ContourLabels.filled
.. autoattribute:: ContourLabels.font
.. autoattribute:: ContourLabels.label_by_level
.. autoattribute:: ContourLabels.margin
.. autoattribute:: ContourLabels.show
.. autoattribute:: ContourLabels.spacing
.. autoattribute:: ContourLabels.step

.. py:currentmodule:: tecplot.plot

ContourLevels
^^^^^^^^^^^^^

.. autoclass:: ContourLevels

    **Methods**

    .. autosummary::

        add
        delete_nearest
        delete_range
        reset
        reset_levels
        reset_to_nice

.. automethod:: ContourLevels.add
.. automethod:: ContourLevels.delete_nearest
.. automethod:: ContourLevels.delete_range
.. automethod:: ContourLevels.reset
.. automethod:: ContourLevels.reset_levels
.. automethod:: ContourLevels.reset_to_nice

.. py:currentmodule:: tecplot.plot

ContourLines
^^^^^^^^^^^^

.. autoclass:: ContourLines

    **Attributes**

    .. autosummary::
        :nosignatures:

        mode
        pattern_length
        step

.. autoattribute:: ContourLines.mode
.. autoattribute:: ContourLines.pattern_length
.. autoattribute:: ContourLines.step

Isosurface
----------

..  contents::
    :local:
    :depth: 1

.. py:currentmodule:: tecplot.plot

IsosurfaceGroup
^^^^^^^^^^^^^^^

.. autoclass:: IsosurfaceGroup

    **Attributes**

    .. autosummary::
        :nosignatures:

        contour
        definition_contour_group
        definition_contour_group_index
        effects
        isosurface_selection
        isosurface_values
        mesh
        obey_source_zone_blanking
        shade
        show

.. autoattribute:: IsosurfaceGroup.contour
.. autoattribute:: IsosurfaceGroup.definition_contour_group
.. autoattribute:: IsosurfaceGroup.definition_contour_group_index
.. autoattribute:: IsosurfaceGroup.effects
.. autoattribute:: IsosurfaceGroup.isosurface_selection
.. autoattribute:: IsosurfaceGroup.isosurface_values
.. autoattribute:: IsosurfaceGroup.mesh
.. autoattribute:: IsosurfaceGroup.obey_source_zone_blanking
.. autoattribute:: IsosurfaceGroup.shade
.. autoattribute:: IsosurfaceGroup.show

.. py:currentmodule:: tecplot.plot

IsosurfaceContour
^^^^^^^^^^^^^^^^^

.. autoclass:: IsosurfaceContour

    **Attributes**

    .. autosummary::
        :nosignatures:

        contour_type
        flood_contour_group
        flood_contour_group_index
        line_color
        line_contour_group
        line_contour_group_index
        line_thickness
        show
        use_lighting_effect

.. autoattribute:: IsosurfaceContour.contour_type
.. autoattribute:: IsosurfaceContour.flood_contour_group
.. autoattribute:: IsosurfaceContour.flood_contour_group_index
.. autoattribute:: IsosurfaceContour.line_color
.. autoattribute:: IsosurfaceContour.line_contour_group
.. autoattribute:: IsosurfaceContour.line_contour_group_index
.. autoattribute:: IsosurfaceContour.line_thickness
.. autoattribute:: IsosurfaceContour.show
.. autoattribute:: IsosurfaceContour.use_lighting_effect

.. py:currentmodule:: tecplot.plot

IsosurfaceEffects
^^^^^^^^^^^^^^^^^

.. autoclass:: IsosurfaceEffects

    **Attributes**

    .. autosummary::
        :nosignatures:

        lighting_effect
        surface_translucency
        use_translucency

.. autoattribute:: IsosurfaceEffects.lighting_effect
.. autoattribute:: IsosurfaceEffects.surface_translucency
.. autoattribute:: IsosurfaceEffects.use_translucency

.. py:currentmodule:: tecplot.plot

IsosurfaceMesh
^^^^^^^^^^^^^^

.. autoclass:: IsosurfaceMesh

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        line_thickness
        show

.. autoattribute:: IsosurfaceMesh.color
.. autoattribute:: IsosurfaceMesh.line_thickness
.. autoattribute:: IsosurfaceMesh.show

.. py:currentmodule:: tecplot.plot

IsosurfaceShade
^^^^^^^^^^^^^^^

.. autoclass:: IsosurfaceShade

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        show
        use_lighting_effect

.. autoattribute:: IsosurfaceShade.color
.. autoattribute:: IsosurfaceShade.show
.. autoattribute:: IsosurfaceShade.use_lighting_effect

Slice
-----

..  contents::
    :local:
    :depth: 1

.. py:currentmodule:: tecplot.plot

SliceGroup
^^^^^^^^^^

.. autoclass:: SliceGroup

    **Attributes**

    .. autosummary::
        :nosignatures:

        arbitrary_normal
        contour
        edge
        effects
        end_position
        mesh
        num_intermediate_slices
        obey_source_zone_blanking
        orientation
        origin
        shade
        show
        show_intermediate_slices
        show_primary_slice
        show_start_and_end_slices
        slice_source
        start_position
        vector

    **Methods**

    .. autosummary::

        set_arbitrary_from_points

.. autoattribute:: SliceGroup.arbitrary_normal
.. autoattribute:: SliceGroup.contour
.. autoattribute:: SliceGroup.edge
.. autoattribute:: SliceGroup.effects
.. autoattribute:: SliceGroup.end_position
.. autoattribute:: SliceGroup.mesh
.. autoattribute:: SliceGroup.num_intermediate_slices
.. autoattribute:: SliceGroup.obey_source_zone_blanking
.. autoattribute:: SliceGroup.orientation
.. autoattribute:: SliceGroup.origin
.. automethod:: SliceGroup.set_arbitrary_from_points
.. autoattribute:: SliceGroup.shade
.. autoattribute:: SliceGroup.show
.. autoattribute:: SliceGroup.show_intermediate_slices
.. autoattribute:: SliceGroup.show_primary_slice
.. autoattribute:: SliceGroup.show_start_and_end_slices
.. autoattribute:: SliceGroup.slice_source
.. autoattribute:: SliceGroup.start_position
.. autoattribute:: SliceGroup.vector

.. py:currentmodule:: tecplot.plot

SliceContour
^^^^^^^^^^^^

.. autoclass:: SliceContour

    **Attributes**

    .. autosummary::
        :nosignatures:

        contour_type
        flood_contour_group
        flood_contour_group_index
        line_color
        line_contour_group
        line_contour_group_index
        line_thickness
        show
        use_lighting_effect

.. autoattribute:: SliceContour.contour_type
.. autoattribute:: SliceContour.flood_contour_group
.. autoattribute:: SliceContour.flood_contour_group_index
.. autoattribute:: SliceContour.line_color
.. autoattribute:: SliceContour.line_contour_group
.. autoattribute:: SliceContour.line_contour_group_index
.. autoattribute:: SliceContour.line_thickness
.. autoattribute:: SliceContour.show
.. autoattribute:: SliceContour.use_lighting_effect

.. py:currentmodule:: tecplot.plot

SliceEdge
^^^^^^^^^

.. autoclass:: SliceEdge

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        edge_type
        line_thickness
        show

.. autoattribute:: SliceEdge.color
.. autoattribute:: SliceEdge.edge_type
.. autoattribute:: SliceEdge.line_thickness
.. autoattribute:: SliceEdge.show

.. py:currentmodule:: tecplot.plot

SliceEffects
^^^^^^^^^^^^

.. autoclass:: SliceEffects

    **Attributes**

    .. autosummary::
        :nosignatures:

        lighting_effect
        surface_translucency
        use_translucency

.. autoattribute:: SliceEffects.lighting_effect
.. autoattribute:: SliceEffects.surface_translucency
.. autoattribute:: SliceEffects.use_translucency

.. py:currentmodule:: tecplot.plot

SliceMesh
^^^^^^^^^

.. autoclass:: SliceMesh

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        line_thickness
        show

.. autoattribute:: SliceMesh.color
.. autoattribute:: SliceMesh.line_thickness
.. autoattribute:: SliceMesh.show

.. py:currentmodule:: tecplot.plot

SliceShade
^^^^^^^^^^

.. autoclass:: SliceShade

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        show
        use_lighting_effect

.. autoattribute:: SliceShade.color
.. autoattribute:: SliceShade.show
.. autoattribute:: SliceShade.use_lighting_effect

.. py:currentmodule:: tecplot.plot

SliceVector
^^^^^^^^^^^

.. autoclass:: SliceVector

    **Attributes**

    .. autosummary::
        :nosignatures:

        arrowhead_style
        color
        is_tangent
        line_thickness
        show
        vector_type

.. autoattribute:: SliceVector.arrowhead_style
.. autoattribute:: SliceVector.color
.. autoattribute:: SliceVector.is_tangent
.. autoattribute:: SliceVector.line_thickness
.. autoattribute:: SliceVector.show
.. autoattribute:: SliceVector.vector_type

Streamtraces
------------

..  contents::
    :local:
    :depth: 1

.. py:currentmodule:: tecplot.plot

Streamtraces
^^^^^^^^^^^^

.. autoclass:: Streamtraces

    **Attributes**

    .. autosummary::
        :nosignatures:

        are_active
        arrowhead_size
        arrowhead_spacing
        color
        count
        dash_skip
        has_terminating_line
        line_thickness
        marker_color
        marker_size
        marker_symbol_type
        max_steps
        min_step_size
        obey_source_zone_blanking
        rod_ribbon
        show_arrows
        show_dashes
        show_markers
        show_paths
        step_size
        termination_line
        timing

    **Methods**

    .. autosummary::

        add
        add_on_zone_surface
        add_rake
        delete_all
        delete_range
        marker_symbol
        position
        set_termination_line
        streamtrace_type

.. automethod:: Streamtraces.add
.. automethod:: Streamtraces.add_on_zone_surface
.. automethod:: Streamtraces.add_rake
.. autoattribute:: Streamtraces.are_active
.. autoattribute:: Streamtraces.arrowhead_size
.. autoattribute:: Streamtraces.arrowhead_spacing
.. autoattribute:: Streamtraces.color
.. autoattribute:: Streamtraces.count
.. autoattribute:: Streamtraces.dash_skip
.. automethod:: Streamtraces.delete_all
.. automethod:: Streamtraces.delete_range
.. autoattribute:: Streamtraces.has_terminating_line
.. autoattribute:: Streamtraces.line_thickness
.. autoattribute:: Streamtraces.marker_color
.. autoattribute:: Streamtraces.marker_size
.. automethod:: Streamtraces.marker_symbol
.. autoattribute:: Streamtraces.marker_symbol_type
.. autoattribute:: Streamtraces.max_steps
.. autoattribute:: Streamtraces.min_step_size
.. autoattribute:: Streamtraces.obey_source_zone_blanking
.. automethod:: Streamtraces.position
.. autoattribute:: Streamtraces.rod_ribbon
.. automethod:: Streamtraces.set_termination_line
.. autoattribute:: Streamtraces.show_arrows
.. autoattribute:: Streamtraces.show_dashes
.. autoattribute:: Streamtraces.show_markers
.. autoattribute:: Streamtraces.show_paths
.. autoattribute:: Streamtraces.step_size
.. automethod:: Streamtraces.streamtrace_type
.. autoattribute:: Streamtraces.termination_line
.. autoattribute:: Streamtraces.timing

.. py:currentmodule:: tecplot.plot

StreamtraceRodRibbon
^^^^^^^^^^^^^^^^^^^^

.. autoclass:: StreamtraceRodRibbon

    **Attributes**

    .. autosummary::
        :nosignatures:

        contour
        effects
        mesh
        num_rod_points
        shade
        width

.. autoattribute:: StreamtraceRodRibbon.contour
.. autoattribute:: StreamtraceRodRibbon.effects
.. autoattribute:: StreamtraceRodRibbon.mesh
.. autoattribute:: StreamtraceRodRibbon.num_rod_points
.. autoattribute:: StreamtraceRodRibbon.shade
.. autoattribute:: StreamtraceRodRibbon.width

.. py:currentmodule:: tecplot.plot

StreamtraceTiming
^^^^^^^^^^^^^^^^^

.. autoclass:: StreamtraceTiming

    **Attributes**

    .. autosummary::
        :nosignatures:

        anchor
        delta
        end
        start

    **Methods**

    .. autosummary::

        reset_delta

.. autoattribute:: StreamtraceTiming.anchor
.. autoattribute:: StreamtraceTiming.delta
.. autoattribute:: StreamtraceTiming.end
.. automethod:: StreamtraceTiming.reset_delta
.. autoattribute:: StreamtraceTiming.start

.. py:currentmodule:: tecplot.plot

StreamtraceRodRibbonContour
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: StreamtraceRodRibbonContour

    **Attributes**

    .. autosummary::
        :nosignatures:

        flood_contour_group
        flood_contour_group_index
        show
        use_lighting_effect

.. autoattribute:: StreamtraceRodRibbonContour.flood_contour_group
.. autoattribute:: StreamtraceRodRibbonContour.flood_contour_group_index
.. autoattribute:: StreamtraceRodRibbonContour.show
.. autoattribute:: StreamtraceRodRibbonContour.use_lighting_effect

.. py:currentmodule:: tecplot.plot

StreamtraceRodRibbonEffects
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: StreamtraceRodRibbonEffects

    **Attributes**

    .. autosummary::
        :nosignatures:

        lighting_effect
        surface_translucency
        use_translucency

.. autoattribute:: StreamtraceRodRibbonEffects.lighting_effect
.. autoattribute:: StreamtraceRodRibbonEffects.surface_translucency
.. autoattribute:: StreamtraceRodRibbonEffects.use_translucency

.. py:currentmodule:: tecplot.plot

StreamtraceRodRibbonMesh
^^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: StreamtraceRodRibbonMesh

    **Attributes**

    .. autosummary::
        :nosignatures:

        line_thickness
        show

.. autoattribute:: StreamtraceRodRibbonMesh.line_thickness
.. autoattribute:: StreamtraceRodRibbonMesh.show

.. py:currentmodule:: tecplot.plot

StreamtraceRodRibbonShade
^^^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: StreamtraceRodRibbonShade

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        show
        use_lighting_effect

.. autoattribute:: StreamtraceRodRibbonShade.color
.. autoattribute:: StreamtraceRodRibbonShade.show
.. autoattribute:: StreamtraceRodRibbonShade.use_lighting_effect

.. py:currentmodule:: tecplot.plot

StreamtraceTerminationLine
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. autoclass:: StreamtraceTerminationLine

    **Attributes**

    .. autosummary::
        :nosignatures:

        color
        is_active
        line_pattern
        line_thickness
        pattern_length
        show

.. autoattribute:: StreamtraceTerminationLine.color
.. autoattribute:: StreamtraceTerminationLine.is_active
.. autoattribute:: StreamtraceTerminationLine.line_pattern
.. autoattribute:: StreamtraceTerminationLine.line_thickness
.. autoattribute:: StreamtraceTerminationLine.pattern_length
.. autoattribute:: StreamtraceTerminationLine.show

Viewport
--------

..  contents::
    :local:
    :depth: 1

.. py:currentmodule:: tecplot.plot

ReadOnlyViewport
^^^^^^^^^^^^^^^^

.. autoclass:: ReadOnlyViewport

    **Attributes**

    .. autosummary::
        :nosignatures:

        bottom
        left
        right
        top

.. autoattribute:: ReadOnlyViewport.bottom
.. autoattribute:: ReadOnlyViewport.left
.. autoattribute:: ReadOnlyViewport.right
.. autoattribute:: ReadOnlyViewport.top

.. py:currentmodule:: tecplot.plot

Viewport
^^^^^^^^

.. autoclass:: Viewport

    **Attributes**

    .. autosummary::
        :nosignatures:

        bottom
        left
        right
        top

.. autoattribute:: Viewport.bottom
.. autoattribute:: Viewport.left
.. autoattribute:: Viewport.right
.. autoattribute:: Viewport.top

.. py:currentmodule:: tecplot.plot

Cartesian2DViewport
^^^^^^^^^^^^^^^^^^^

.. autoclass:: Cartesian2DViewport

    **Attributes**

    .. autosummary::
        :nosignatures:

        bottom
        left
        nice_fit_buffer
        right
        top
        top_snap_target
        top_snap_tolerance

.. autoattribute:: Cartesian2DViewport.bottom
.. autoattribute:: Cartesian2DViewport.left
.. autoattribute:: Cartesian2DViewport.nice_fit_buffer
.. autoattribute:: Cartesian2DViewport.right
.. autoattribute:: Cartesian2DViewport.top
.. autoattribute:: Cartesian2DViewport.top_snap_target
.. autoattribute:: Cartesian2DViewport.top_snap_tolerance

.. py:currentmodule:: tecplot.plot

PolarViewport
^^^^^^^^^^^^^

.. autoclass:: PolarViewport

    **Attributes**

    .. autosummary::
        :nosignatures:

        border_color
        border_thickness
        bottom
        fill_color
        left
        right
        show_border
        top

.. autoattribute:: PolarViewport.border_color
.. autoattribute:: PolarViewport.border_thickness
.. autoattribute:: PolarViewport.bottom
.. autoattribute:: PolarViewport.fill_color
.. autoattribute:: PolarViewport.left
.. autoattribute:: PolarViewport.right
.. autoattribute:: PolarViewport.show_border
.. autoattribute:: PolarViewport.top

View
----

..  contents::
    :local:
    :depth: 1

.. py:currentmodule:: tecplot.plot

Cartesian2DView
^^^^^^^^^^^^^^^

.. autoclass:: Cartesian2DView

    **Methods**

    .. autosummary::

        fit

.. automethod:: Cartesian2DView.fit

.. py:currentmodule:: tecplot.plot

Cartesian3DView
^^^^^^^^^^^^^^^

.. autoclass:: Cartesian3DView

    **Attributes**

    .. autosummary::
        :nosignatures:

        alpha
        distance
        position
        psi
        theta
        width

    **Methods**

    .. autosummary::

        fit

.. autoattribute:: Cartesian3DView.alpha
.. autoattribute:: Cartesian3DView.distance
.. automethod:: Cartesian3DView.fit
.. autoattribute:: Cartesian3DView.position
.. autoattribute:: Cartesian3DView.psi
.. autoattribute:: Cartesian3DView.theta
.. autoattribute:: Cartesian3DView.width

.. py:currentmodule:: tecplot.plot

LineView
^^^^^^^^

.. autoclass:: LineView

    **Methods**

    .. autosummary::

        fit

.. automethod:: LineView.fit

.. py:currentmodule:: tecplot.plot

PolarView
^^^^^^^^^

.. autoclass:: PolarView

    **Methods**

    .. autosummary::

        fit

.. automethod:: PolarView.fit
