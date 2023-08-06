import gfapy

class LinearPaths:

  # @!method merge_linear_path(segpath, **options)
  #   Merge a linear path, i.e. a path of segments without extra-branches.
  #   @!macro [new] merge_more
  #     Extends the RGFA method, with additional functionality:
  #     - +name+: the name of the merged segment is set to the name of the
  #       single segments joined by underscore (+_+). If a name already
  #       contained an underscore, it is splitted before merging. Whenever a
  #       segment is reversed complemented, its name (or the name of all its
  #       components) is suffixed with a +^+; if the last letter was already
  #       +^+, it is removed; if it contained +_+ the name is splitted, the
  #       elements reversed and joined back using +_+; round parentheses are
  #       removed from the name before processing and added back after it.
  #     - +:or+: keeps track of the origin of the merged segment; the
  #       origin tag is set to an array of :or or name
  #       (if no :or available) tags of the segment which have been merged;
  #       the character +^+ is assigned the same meaning as in +name+
  #     - +:rn+: tag used to store possible inversion positions and
  #       it is updated by this method; i.e. it is passed from the single
  #       segments to the merged segment, and the coordinates updated
  #     - +:mp+: tag used to store the position of the
  #       single segments in the merged segment; it is created or updated by
  #       this method
  #     Note that the extensions to the original method will only be run
  #     if either #enable_extensions has been called on RGFA object
  #     or the enable_tracking parameter is set..
  #     After calling #enable_extensions, you may still obtain the original
  #     behaviour by setting the disable_tracking parameter.
  #   @!macro merge_more
  #
  #   @!macro [new] merge_lim
  #
  #     Limitations: all containments und paths involving merged segments are
  #     deleted.
  #   @!macro merge_lim
  #
  #   @param segpath [Array<RGFA::SegmentEnd>] a linear path, such as that
  #     retrieved by #linear_path (see RGFA API documentation)
  #   @!macro [new] merge_options
  #     @param options [Hash] optional keyword arguments
  #     @option options [String, :short, nil] :merged_name (nil)
  #       if nil, the merged_name is automatically computed; if :short,
  #       a name is computed starting with "merged1" and calling next until
  #       an available name is founf; if String, the name to use
  #     @option options [Boolean] :cut_counts (false)
  #       if true, total count in merged segment m, composed of segments
  #       s of set S is multiplied by the factor Sum(|s in S|)/|m|
  #     @option options [Boolean] :enable_tracking (false)
  #       if true, the extended method is used
  #   @!macro merge_options
  #
  #   @return [RGFA] self
  #   @see #merge_linear_paths

  # @!method merge_linear_paths(**options)
  #   Merge all linear paths in the graph, i.e.
  #   paths of segments without extra-branches
  #   @!macro merge_more
  #   @!macro merge_lim
  #   @!macro merge_options
  #
  #   @return [RGFA] self

  def linear_path(self, segment, exclude = None):
    if isinstance(segment, gfapy.Line):
      segment_name = segment.name
    else:
      segment_name = segment
      segment = self.segment(segment_name)
    cs = segment._connectivity()
    if exclude is None:
      exclude = set()
    segpath = gfapy.SegmentEndsPath()
    for i, et in enumerate(["L", "R"]):
      if cs[i] == 1:
        exclude.add(segment_name)
        if len(segpath) > 0:
          segpath.pop()
        segpath += self.__traverse_linear_path(
            gfapy.SegmentEnd(segment, et), exclude)
    return segpath

  def linear_paths(self, redundant_junctions=False):
    exclude = set()
    if redundant_junctions:
      junction_exclude = set()
    retval = []
    segnames = self.segment_names
    if self._progress:
      self._progress_log_init("linear_paths", "segments", len(segnames),
          "Detect linear paths ({})".format(len(segnames)))
    for sn in segnames:
      if self._progress:
        self._progress_log("linear_paths")
      if sn in exclude:
        continue
      lp = self.linear_path(sn, exclude)
      if not redundant_junctions:
        if len(lp) > 1:
          retval.append(lp)
      else:
        if lp:
          self.__extend_linear_path_to_junctions(lp)
          retval.append(lp)
        else:
          retval += self.__junction_junction_paths(sn, junction_exclude)
    if self._progress:
      self._progress_log_end("linear_paths")
    return retval

  def merge_linear_path(self, segpath, redundant_junctions=False, jntag="jn",
                        enable_tracking=False, merged_name=None,
                        cut_counts=False):
    if len(segpath) < 2:
      return self
    if not redundant_junctions and (segpath[0] in [True, False]):
      first_redundant = segpath.pop(0)
      last_redundant = segpath.pop()
    else:
      first_redundant = False
      last_redundant = False
    segpath = [gfapy.SegmentEnd(s) for s in segpath]
    merged, first_reversed, last_reversed = \
        self.__create_merged_segment(segpath,
            redundant_junctions=redundant_junctions, jntag=jntag,
            merged_name=merged_name,cut_counts=cut_counts,
            enable_tracking=enable_tracking)
    self.append(merged)
    if first_redundant:
      self.__link_duplicated_first(merged, self.segment(segpath[0].segment),
                                   first_reversed, jntag)
    else:
      self.__link_merged(merged.name, segpath[0].inverted(), first_reversed)
    if last_redundant:
      self.__link_duplicated_last(merged, self.segment(segpath[-1].segment),
                                  last_reversed, jntag)
    else:
      self.__link_merged(merged.name, segpath[-1], last_reversed)
    idx1 = 1 if first_redundant else 0
    idx2 = -1 if last_redundant else None
    for sn_et in segpath[idx1:idx2]:
      self.segment(sn_et.segment).disconnect()
      if self._progress:
        self._progress_log("merge_linear_paths", 0.05)
    return self

  def merge_linear_paths(self, redundant_junctions=False, jntag="jn",
                        merged_name=None, enable_tracking=False,
                        cut_counts=False):
    paths = self.linear_paths(redundant_junctions)
    if self._progress:
      psize = sum([len(path) for path in paths])
      self._progress_log_init("merge_linear_paths", "segments", psize,
          "Merge {} linear paths ".format(len(paths))+
          "({} segments)".format(psize))
    for path in paths:
      self.merge_linear_path(path, redundant_junctions=redundant_junctions,
                             jntag=jntag, merged_name=merged_name,
                             cut_counts=cut_counts,
                             enable_tracking=enable_tracking)
    if self._progress:
      self._progress_log_end("merge_linear_paths")
    if redundant_junctions:
      self.__remove_junctions(jntag)
    return self

  def __traverse_linear_path(self, segment_end, exclude):
    lst = gfapy.SegmentEndsPath()
    current = gfapy.SegmentEnd(segment_end)
    current.segment = self.segment(current.segment)
    while True:
      after = current.segment.dovetails_of_end(current.end_type)
      before = current.segment.dovetails_of_end(gfapy.invert(current.end_type))
      if (len(before) == 1 and len(after) == 1) or not lst:
        lst.append(gfapy.SegmentEnd(current.name, current.end_type))
        exclude.add(current.name)
        current = after[0].other_end(current).inverted()
        if current.name in exclude:
          break
      elif len(before) == 1:
        lst.append(gfapy.SegmentEnd(current.name, current.end_type))
        exclude.add(current.name)
        break
      else:
        break
    if segment_end.end_type == "L":
      return list(reversed(lst))
    else:
      return lst

  def __sum_of_counts(self, segpath, multfactor = 1):
    retval = {}
    segs = [self.try_get_segment(sn_et.segment) for sn_et in segpath]
    for count_tag in ["KC","RC","FC"]:
      for s in segs:
        if count_tag in s.tagnames:
          if count_tag not in retval:
            retval[count_tag] = 0
          retval[count_tag] += int(retval[count_tag]*multfactor)
    return retval

  def _add_segment_to_merged(self, merged, segment, is_reversed, cut, init,
                             enable_tracking=False, merged_name=None):
    n = segment.name
    if is_reversed:
      s = gfapy.sequence.rc(segment.sequence)[cut:]
      if enable_tracking:
        n = self._reverse_segment_name(segment.name, "_")
        rn = self._reverse_pos_array(segment.rn, segment.LN)
        mp = self._reverse_pos_array(segment.mp, segment.LN)
    else:
      s = segment.sequence[cut:]
      if enable_tracking:
        rn = segment.rn
        mp = segment.mp
    if enable_tracking:
      if not mp and segment.LN:
        mp = [1, segment.LN]
      if segment.get("or") is None:
        o = n
      elif is_reversed:
        o = self._reverse_segment_name(segment.get("or"), ",")
      else:
        o = segment.get("or")
    if init:
      merged.sequence = [s]
      if merged_name:
        merged.name = [merged_name]
      else:
        merged.name = [n]
      merged.LN = segment.LN
      if enable_tracking:
        merged.rn = rn
        merged.set("or",[o])
        merged.mp = mp
    else:
      if gfapy.is_placeholder(segment.sequence):
        merged.sequence = gfapy.Placeholder()
      else:
        merged.sequence.append(s)
      if not merged_name:
        merged.name.append(n)
      if merged.LN:
        if enable_tracking:
          if rn:
            rn = [pos - cut + merged.LN for pos in rn]
            if not merged.rn:
              merged.rn = rn
            else:
              merged.rn += rn
          if mp and merged.mp:
            merged.mp += [pos - cut + merged.LN for pos in mp]
        if segment.LN:
          merged.LN += (segment.LN - cut)
        else:
          merged.LN = None
      elif enable_tracking:
        merged.mp = None
      if enable_tracking:
        if not merged.get("or"):
          merged.set("or", [o])
        else:
          merged.get("or").append(o)

  def __get_short_merged_name(self):
    forbidden = self.names
    i = 1
    merged_name = "merged1"
    while merged_name in forbidden:
      i += 1
      merged_name = "merged{}".format(i)
    return merged_name

  @staticmethod
  def _reverse_segment_name(name, separator):
    retval = []
    for part in name.split(separator):
      has_openp = part[0] == "("
      has_closep = part[-1] == ")"
      if has_openp:
        part = part[1:-2]
      if has_closep:
        part = part[:-1]
      if part[-1] == "^":
        part = part[:-1]
      else:
        part+="^"
      if has_openp:
        part+=")"
      if has_closep:
        part+="("+part
      retval.append(part)
    return separator.join(reversed(retval))

  @staticmethod
  def _reverse_pos_array(pos_array, lastpos):
    if pos_array is None or lastpos is None:
      return None
    else:
      return [lastpos-pos+1 for pos in pos_array].reverse()

  def __create_merged_segment(self, segpath, redundant_junctions=False,
      jntag="jn", merged_name=None, enable_tracking=False, cut_counts=False):
    merged = self.try_get_segment(segpath[0].segment).clone()
    merged.set(jntag, None)
    merged_vlevel = merged.vlevel
    merged.vlevel = 0
    total_cut = 0
    a = segpath[0]
    first_reversed = (a.end_type == "L")
    last_reversed = None
    if merged_name == "short":
      merged_name = self.__get_short_merged_name()
    self._add_segment_to_merged(merged, self.segment(a.segment),
        first_reversed, 0, True, enable_tracking=enable_tracking,
        merged_name=merged_name)
    if self._progress:
      self._progress_log("merge_linear_paths", 0.95)
    for i in range(len(segpath)-1):
      b = gfapy.SegmentEnd(segpath[i+1]).inverted()
      ls = self.segment(a.segment).end_relations(a.end_type, b, "dovetails")
      if len(ls) != 1:
        msg = "A single link was expected between {}".format(a) + \
              "and {}".format(b) + "{} were found".format(len(ls))
        raise gfapy.ValueError(msg)
      l = ls[0]
      if not l.overlap:
        cut = 0
      elif all(op.code in ["M","="] for op in l.overlap):
        cut = sum([len(op) for op in l.overlap])
      else:
        raise gfapy.ValueError(
            "Merging is only allowed if all operations are M/=")
      total_cut += cut
      last_reversed = (b.end_type == "R")
      self._add_segment_to_merged(merged, self.segment(b.segment),
          last_reversed, cut, False, enable_tracking=enable_tracking,
          merged_name=merged_name)
      a = gfapy.SegmentEnd(b).inverted()
      if self._progress:
        self._progress_log("merge_linear_paths", 0.95)
    merged.vlevel = merged_vlevel
    if isinstance(merged.name, list):
      merged.name = "_".join(merged.name)
    ortag = merged.get("or")
    if isinstance(ortag, list):
      merged.set("or", ",".join(ortag))
    if not gfapy.is_placeholder(merged.sequence):
      merged.sequence = "".join(merged.sequence)
      if self._version == "gfa1":
        if not merged.LN:
          merged.LN = len(merged.sequence)
        elif self._vlevel > 0 and merged.LN != len(merged.sequence):
          raise gfapy.InconsistencyError(
              "Computed sequence length {} ".format(merged.sequence.length)+
              "and computed LN {} differ".format(merged.LN))
    if merged.length is not None:
      for count_tag in ["KC", "RC", "FC"]:
        merged.set(count_tag, None)
    else:
      factor = 1
      if cut_counts:
        factor = merged.length / (total_cut+merged.length)
      for count_tag,count in self.__sum_of_counts(segpath,factor).items():
        merged.set(count_tag, count)
    return merged, first_reversed, last_reversed

  def __link_merged(self, merged_name, segment_end, is_reversed):
    for l in self.segment(segment_end.segment).dovetails_of_end(
                                                 segment_end.end_type):
      l2 = l.clone()
      if l2.to_segment == segment_end.segment:
        l2.to_segment = merged_name
        if is_reversed:
          l2.to_orient = gfapy.invert(l2.to_orient)
      else:
        l2.from_segment = merged_name
        if is_reversed:
          l2.from_orient = gfapy.invert(l2.from_orient)
      self.add_line(l2)

